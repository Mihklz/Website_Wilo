import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotorService, Motor } from '../../services/motor.service';

@Component({
  selector: 'app-motors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './motors.component.html',
  styleUrls: ['./motors.component.scss']
})
export class MotorsComponent implements OnInit {
  motors: Motor[] = [];

  newMotor: Partial<Motor> = {
    name: '',
    powerKw: undefined,
    currentA: undefined,
    speedRpm: undefined,
    description: '',
    priceRub: undefined
  };

  editMode = false;
  editMotorId: number | null = null;

  // 🔍 Поиск и сортировка
  searchTerm: string = '';
  sortField: 'name' | 'priceRub' | 'powerKw' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private motorService: MotorService) {}

  ngOnInit(): void {
    this.loadMotors();
  }

  loadMotors(): void {
    this.motorService.getAll().subscribe({
      next: (data) => (this.motors = data),
      error: (err) => console.error('Ошибка при загрузке моторов:', err)
    });
  }

  createMotor(): void {
    if (!this.newMotor.name || !this.newMotor.description) return;

    this.motorService.create(this.newMotor as Motor).subscribe({
      next: (created) => {
        this.motors.push(created);
        this.resetForm();
      },
      error: (err) => console.error('Ошибка при создании:', err)
    });
  }

  startEdit(motor: Motor): void {
    this.editMode = true;
    this.editMotorId = motor.id;
    this.newMotor = {
      name: motor.name,
      powerKw: motor.powerKw,
      currentA: motor.currentA,
      speedRpm: motor.speedRpm,
      description: motor.description,
      priceRub: motor.priceRub
    };
  }

  updateMotor(): void {
    if (
      this.editMotorId === null ||
      !this.newMotor.name ||
      !this.newMotor.description
    ) return;

    const updatedMotor: Motor = {
      id: this.editMotorId,
      name: this.newMotor.name!,
      powerKw: this.newMotor.powerKw!,
      currentA: this.newMotor.currentA!,
      speedRpm: this.newMotor.speedRpm!,
      description: this.newMotor.description!,
      priceRub: this.newMotor.priceRub!
    };

    this.motorService.update(this.editMotorId, updatedMotor).subscribe({
      next: () => {
        const index = this.motors.findIndex((m) => m.id === this.editMotorId);
        if (index !== -1) {
          this.motors[index] = updatedMotor;
        }
        this.resetForm();
      },
      error: (err) => console.error('Ошибка при обновлении:', err)
    });
  }

  deleteMotor(id: number): void {
    this.motorService.delete(id).subscribe({
      next: () => {
        this.motors = this.motors.filter((m) => m.id !== id);
      },
      error: (err) => console.error('Ошибка при удалении:', err)
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.editMode = false;
    this.editMotorId = null;
    this.newMotor = {
      name: '',
      powerKw: undefined,
      currentA: undefined,
      speedRpm: undefined,
      description: '',
      priceRub: undefined
    };
  }

  // 🧠 Метод фильтрации и сортировки
  filteredAndSortedMotors(): Motor[] {
    let result = this.motors;

    if (this.searchTerm.trim()) {
      result = result.filter(m =>
        m.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
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

