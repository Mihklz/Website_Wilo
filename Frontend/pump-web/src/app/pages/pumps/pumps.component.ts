import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PumpService, Pump } from '../../services/pump.service';
import { MaterialService, Material } from '../../services/material.service';
import { MotorService, Motor } from '../../services/motor.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pumps',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pumps.component.html',
  styleUrls: ['./pumps.component.scss']
})


export class PumpsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  pumps: Pump[] = [];
  materials: Material[] = [];
  motors: Motor[] = [];

  newPump: Partial<Pump> = {
    name: '',
    description: '',
    housingMaterialId: undefined,
    impellerMaterialId: undefined,
    motorId: undefined,
    priceRub: undefined,
    weightKg: undefined,
    maxPressureBar: undefined,
    liquidTemperatureC: undefined,
    imageUrl: ''
  };

  editMode = false;
  editPumpId: number | null = null;
  selectedPumpId: number | null = null;
  imagePreviewUrl: string | null = null;
  selectedMotor: Motor | undefined = undefined;


  //  Поиск и сортировка
  searchTerm: string = '';
  sortField: 'priceRub' | 'weightKg' | 'name' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private pumpService: PumpService,
    private materialService: MaterialService,
    private motorService: MotorService
  ) {}

  ngOnInit(): void {
    this.loadPumps();
    this.loadMaterials();
    this.loadMotors();
  }

  loadPumps(): void {
    this.pumpService.getAll().subscribe({
      next: data => this.pumps = data,
      error: err => console.error('Ошибка при загрузке насосов:', err)
    });
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: data => this.materials = data,
      error: err => console.error('Ошибка при загрузке материалов:', err)
    });
  }

  loadMotors(): void {
    this.motorService.getAll().subscribe({
      next: data => this.motors = data,
      error: err => console.error('Ошибка при загрузке моторов:', err)
    });
  }

  isFormValid(): boolean {
    const p = this.newPump;
    return !!(
      p.name?.trim() &&
      p.description?.trim() &&
      p.housingMaterialId &&
      p.impellerMaterialId &&
      p.motorId &&
      p.priceRub !== undefined &&
      p.weightKg !== undefined &&
      p.maxPressureBar !== undefined &&
      p.liquidTemperatureC !== undefined
    );
  }

  createPump(): void {
    if (!this.isFormValid()) {
      alert('Пожалуйста, заполните все поля перед созданием насоса.');
      return;
    }

    this.pumpService.create(this.newPump as Pump).subscribe({
      next: created => {
        this.pumps.push(created);
        this.resetForm();
      },
      error: err => console.error('Ошибка при создании:', err)
    });
  }

  startEdit(pump: Pump): void {
    this.editMode = true;
    this.editPumpId = pump.id;
    this.newPump = { ...pump };
  }

  updatePump(): void {
    if (!this.editPumpId || !this.isFormValid()) {
      alert('Пожалуйста, заполните все поля перед обновлением насоса.');
      return;
    }

    const updatedPump: Pump = {
      id: this.editPumpId,
      name: this.newPump.name!,
      description: this.newPump.description!,
      housingMaterialId: this.newPump.housingMaterialId!,
      impellerMaterialId: this.newPump.impellerMaterialId!,
      motorId: this.newPump.motorId!,
      priceRub: this.newPump.priceRub!,
      weightKg: this.newPump.weightKg!,
      maxPressureBar: this.newPump.maxPressureBar!,
      liquidTemperatureC: this.newPump.liquidTemperatureC!,
      imageUrl: this.newPump.imageUrl || ''
    };

    this.pumpService.update(this.editPumpId, updatedPump).subscribe({
      next: () => {
        const index = this.pumps.findIndex(p => p.id === this.editPumpId);
        if (index !== -1) this.pumps[index] = updatedPump;
        this.resetForm();
      },
      error: err => console.error('Ошибка при обновлении:', err)
    });
  }

  deletePump(id: number): void {
    this.pumpService.delete(id).subscribe({
      next: () => this.pumps = this.pumps.filter(p => p.id !== id),
      error: err => console.error('Ошибка при удалении:', err)
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  toggleDetails(pumpId: number): void {
    if (this.selectedPumpId === pumpId) {
      this.selectedPumpId = null;
      this.selectedMotor = undefined;
    } else {
      this.selectedPumpId = pumpId;
      const pump = this.pumps.find(p => p.id === pumpId);
      this.selectedMotor = this.getMotorDetails(pump?.motorId);
    }
  }
  

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
      this.newPump.imageUrl = this.imagePreviewUrl; // сохраняем как base64 в imageUrl
    };
  
    reader.readAsDataURL(file);
  }

  private resetForm(): void {
    this.editMode = false;
    this.editPumpId = null;
    this.newPump = {
      name: '',
      description: '',
      housingMaterialId: undefined,
      impellerMaterialId: undefined,
      motorId: undefined,
      priceRub: undefined,
      weightKg: undefined,
      maxPressureBar: undefined,
      liquidTemperatureC: undefined,
      imageUrl: ''
    };

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

  }

  getMaterialName(id: number): string {
    return this.materials.find(m => m.id === id)?.name || 'Неизвестно';
  }

  getMotorName(id: number): string {
    return this.motors.find(m => m.id === id)?.name || 'Неизвестно';
  }

  getMotorDetails(id: number | undefined): Motor | undefined {
    return this.motors.find(m => m.id === id);
  }
  
  getMaterialDetails(id: number | undefined): Material | undefined {
    return this.materials.find(m => m.id === id);
  }
  

  filteredAndSortedPumps(): Pump[] {
    let result = this.pumps;

    if (this.searchTerm.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }

    return result.sort((a, b) => {
      const fieldA = a[this.sortField];
      const fieldB = b[this.sortField];

      if (fieldA === undefined || fieldB === undefined) return 0;

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return this.sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      return this.sortDirection === 'asc'
        ? Number(fieldA) - Number(fieldB)
        : Number(fieldB) - Number(fieldA);
    });
  }
}
