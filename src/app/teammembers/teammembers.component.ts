import { Component } from '@angular/core';

@Component({
  selector: 'app-teammembers',
  templateUrl: './teammembers.component.html',
  styleUrls: ['./teammembers.component.scss']
})
export class TeammembersComponent {
  teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Lead Developer',
      description: 'Full-stack developer with 10+ years experience in AR/VR technologies.',
      imageUrl: 'assets/images/team/sarah.jpg',
      socialLinks: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: '3D Artist',
      description: 'Specializes in 3D modeling and animation for immersive experiences.',
      imageUrl: 'assets/images/team/michael.jpg',
      socialLinks: {
        linkedin: '#',
        twitter: '#'
      }
    },
  ];
}
