import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  technologies = [
    {
      title: 'Virtual Reality',
      image: 'assets/images/vr-img.jpeg',
      description: 'Immerse your clients in an interactive, engaging & fun experience with our custom virtual reality (VR) applications...'
    },
    {
      title: 'Augmented Reality',
      image: 'assets/images/ar-img.jpeg',
      description: 'AR can enhance business marketing efforts by providing an interactive and immersive experience for customers...'
    },
    {
      title: 'Mixed Reality',
      image: 'assets/images/mixed-img.jpeg',
      description: 'MR blends virtual and real-world elements to create immersive and interactive experiences...'
    },
    {
      title: '3D Rendering',
      image: 'assets/images/3d-render.jpeg',
      description: '3D architectural rendering & animation service allows clients to experience a property before it is built...'
    },
    {
      title: '3D Web',
      image: 'assets/images/3dweb.jpeg',
      description: '3D web development can bring your website to life with immersive 3D experiences...'
    },
    {
      title: '3D Scanning',
      image: 'assets/images/3d-scan.webp',
      description: '3D Matterport scanning allows customers to experience built spaces virtually...'
    }
  ];
}