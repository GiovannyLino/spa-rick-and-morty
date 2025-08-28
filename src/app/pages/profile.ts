import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone: false
})
export class Profile implements OnInit {
  // ... (todo o resto do código permanece igual)
  isEditingInfo = false;
  isEditingAbout = false;
  editingEducationIndex: number | null = null;
  editingExperienceIndex: number | null = null;
  editableProfileData: any;
  editableEducationItem: any;
  editableExperienceItem: any;
  profileData: any;
  educationData: any[] = [];
  experienceData: any[] = [];

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setTitle('');
    this.loadDataFromStorage();
    this.editableProfileData = { ...this.profileData };
  }

  loadDataFromStorage(): void {
    const savedProfile = localStorage.getItem('profileData');
    const savedEducation = localStorage.getItem('educationData');
    const savedExperience = localStorage.getItem('experienceData');

    this.profileData = savedProfile ? JSON.parse(savedProfile) : {
      name: 'Nome Completo',
      age: 'Idade',
      avatarUrl: 'assets/avatar-placeholder.jpg',
      githubUrl: 'https://github.com/seu-usuario',
      linkedinUrl: 'https://linkedin.com/in/seu-usuario',
      about: 'Clique em "Editar" para preencher esta seção.'
    };

    // CORREÇÃO APLICADA AQUI: Voltamos a ter 3 itens de exemplo
    this.educationData = savedEducation ? JSON.parse(savedEducation) : [
      { course: 'Nome do Curso 1', institution: 'Nome da Instituição 1', period: '12/12/2025', status: 'Cursando' },
      { course: 'Nome do Curso 2', institution: 'Nome da Instituição 2', period: '12/12/2025', status: 'Cursando' },
      { course: 'Nome do Curso 3', institution: 'Nome da Instituição 3', period: '12/12/2025', status: 'Cursando' }
    ];

    // E CORREÇÃO APLICADA AQUI: Voltamos a ter 3 itens de exemplo
    this.experienceData = savedExperience ? JSON.parse(savedExperience) : [
      { company: 'Nome da Empresa 1', role: 'Cargo', period: '12/12/2025 | 12/12/2025', description: 'Descrição das atividades desempenhadas.' },
      { company: 'Nome da Empresa 2', role: 'Cargo', period: '12/12/2025 | 12/12/2025', description: 'Descrição das atividades desempenhadas.' },
      { company: 'Nome da Empresa 3', role: 'Cargo', period: '12/12/2025 | 12/12/2025', description: 'Descrição das atividades desempenhadas.' }
    ];
  }

  // ... (o restante do arquivo continua exatamente o mesmo)
  saveDataToStorage(): void {
    localStorage.setItem('profileData', JSON.stringify(this.profileData));
    localStorage.setItem('educationData', JSON.stringify(this.educationData));
    localStorage.setItem('experienceData', JSON.stringify(this.experienceData));
  }
  toggleEditInfo(): void { this.isEditingInfo = !this.isEditingInfo; if (!this.isEditingInfo) this.editableProfileData = { ...this.profileData }; }
  saveInfo(): void { this.profileData = { ...this.editableProfileData }; this.isEditingInfo = false; this.saveDataToStorage(); }
  toggleEditAbout(): void { this.isEditingAbout = !this.isEditingAbout; if (!this.isEditingAbout) this.editableProfileData.about = this.profileData.about; }
  saveAbout(): void { this.profileData.about = this.editableProfileData.about; this.isEditingAbout = false; this.saveDataToStorage(); }
  onFileSelected(event: any): void { const file: File = event.target.files[0]; if (file) { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => { this.editableProfileData.avatarUrl = reader.result as string; }; } }
  editEducation(index: number): void { this.editingEducationIndex = index; this.editableEducationItem = { ...this.educationData[index] }; }
  saveEducation(index: number): void { this.educationData[index] = this.editableEducationItem; this.editingEducationIndex = null; this.saveDataToStorage(); }
  cancelEditEducation(): void { this.editingEducationIndex = null; }
  addEducation(): void { const newItem = { course: '', institution: '', period: '', status: '' }; this.educationData.push(newItem); this.editEducation(this.educationData.length - 1); }
  deleteEducation(index: number): void { this.educationData.splice(index, 1); this.saveDataToStorage(); }
  editExperience(index: number): void { this.editingExperienceIndex = index; this.editableExperienceItem = { ...this.experienceData[index] }; }
  saveExperience(index: number): void { this.experienceData[index] = this.editableExperienceItem; this.editingExperienceIndex = null; this.saveDataToStorage(); }
  cancelEditExperience(): void { this.editingExperienceIndex = null; }
  addExperience(): void { const newItem = { company: '', role: '', period: '', description: '' }; this.experienceData.push(newItem); this.editExperience(this.experienceData.length - 1); }
  deleteExperience(index: number): void { this.experienceData.splice(index, 1); this.saveDataToStorage(); }
}