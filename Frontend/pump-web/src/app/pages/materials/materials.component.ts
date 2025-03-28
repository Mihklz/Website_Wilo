import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialService, Material } from '../../services/material.service';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
  materials: Material[] = [];

  newMaterial: Partial<Material> = {
    name: '',
    description: ''
  };

  editMode: boolean = false;
  editMaterialId: number | null = null;

  // 🔍 фильтрация и сортировка
  searchTerm: string = '';
  sortField: keyof Material = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (data) => this.materials = data,
      error: (err) => console.error('Ошибка при получении материалов:', err)
    });
  }

  get filteredAndSortedMaterials(): Material[] {
    return this.materials
      .filter(m => m.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => {
        const aValue = a[this.sortField]?.toString().toLowerCase() || '';
        const bValue = b[this.sortField]?.toString().toLowerCase() || '';
        return this.sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  }

  createMaterial(): void {
    if (!this.newMaterial.name || !this.newMaterial.description) return;

    this.materialService.create(this.newMaterial as Material).subscribe({
      next: (created) => {
        this.materials.push(created);
        this.newMaterial = { name: '', description: '' };
      },
      error: (err) => console.error('Ошибка при создании:', err)
    });
  }

  deleteMaterial(id: number): void {
    this.materialService.delete(id).subscribe({
      next: () => {
        this.materials = this.materials.filter(m => m.id !== id);
      },
      error: (err) => console.error('Ошибка при удалении:', err)
    });
  }

  startEdit(material: Material): void {
    this.editMode = true;
    this.editMaterialId = material.id;
    this.newMaterial = {
      name: material.name,
      description: material.description
    };
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editMaterialId = null;
    this.newMaterial = { name: '', description: '' };
  }

  updateMaterial(): void {
    if (
      this.editMaterialId === null ||
      !this.newMaterial.name ||
      !this.newMaterial.description
    ) return;

    this.materialService.update(this.editMaterialId!, {
      id: this.editMaterialId!,
      name: this.newMaterial.name!,
      description: this.newMaterial.description!
    }).subscribe({
      next: () => {
        const index = this.materials.findIndex(m => m.id === this.editMaterialId);
        if (index !== -1) {
          this.materials[index] = {
            id: this.editMaterialId!,
            name: this.newMaterial.name!,
            description: this.newMaterial.description!
          };
        }

        this.cancelEdit();
      },
      error: (err) => console.error('Ошибка при обновлении:', err)
    });
  }
}
