# Portfolio System Guide

Bu faylda yeni tələbə portfolioları əlavə etmək üçün addım-addım təlimat verilmişdir.

## 📁 Struktur

Portfolio sistemi aşağıdakı strukturda qurulmuşdur:

```
Proqramlar (Programs)
├── Qruplar (Groups)
    ├── Tələbələr (Students)
        ├── Layihələr (Projects)
            ├── Aylıq layihələr (Monthly projects)
            └── Final layihələr (Final projects)
```

## 🔧 Yeni Portfolio Əlavə Etmək

### 1. Məlumat Strukturu (`src/data/portfolios.js`)

Bütün portfolio məlumatları `src/data/portfolios.js` faylında saxlanılır.

#### Yeni Proqram Əlavə Etmək:

```javascript
'program-id': {
  name: 'Proqram Adı',
  description: 'Proqram təsviri',
  groups: {
    // Qruplar buraya əlavə edilir
  }
}
```

#### Yeni Qrup Əlavə Etmək:

```javascript
'group-id': {
  name: 'Qrup Adı',
  description: 'Qrup təsviri',
  students: {
    // Tələbələr buraya əlavə edilir
  }
}
```

#### Yeni Tələbə Əlavə Etmək:

```javascript
'student-id': {
  name: 'Ad',
  surname: 'Soyad',
  age: 22,
  profession: 'Peşə',
  photo: '/images/students/student-photo.jpg',
  projects: {
    // Layihələr buraya əlavə edilir
  }
}
```

#### Yeni Layihə Əlavə Etmək:

```javascript
'project-id': {
  type: 'monthly', // və ya 'final'
  month: 4, // yalnız aylıq layihələr üçün
  title: 'Layihə Adı',
  description: 'Layihə təsviri',
  skills: [
    'Bacarıq 1',
    'Bacarıq 2',
    'Bacarıq 3'
  ],
  techStack: ['Java', 'Spring Boot', 'React'],
  images: [
    '/images/projects/project-1.jpg',
    '/images/projects/project-2.jpg'
  ],
  githubUrl: 'https://github.com/username/project',
  liveUrl: 'https://project-demo.com',
  date: '2024-12-01'
}
```

### 2. Şəkil Faylları

#### Tələbə Şəkilləri:
- Qovluq: `public/images/students/`
- Format: JPG, PNG
- Ölçü: 400x400px (tövsiyə edilir)
- Adlandırma: `ad-soyad.jpg`

#### Layihə Şəkilləri:
- Qovluq: `public/images/projects/`
- Format: JPG, PNG
- Ölçü: 1200x800px (tövsiyə edilir)
- Adlandırma: `layihe-adi-1.jpg`, `layihe-adi-2.jpg`

### 3. Tam Nümunə - Yeni Tələbə Əlavə Etmək

```javascript
// src/data/portfolios.js faylında
export const portfolioData = {
  programs: {
    'ai-programming': {
      name: 'Süni intellekt Əsaslı Proqramlaşdırma',
      description: 'AI əsaslı proqramlaşdırma kursu',
      groups: {
        'avernus': {
          name: 'Avernus',
          description: 'Birinci qrup',
          students: {
            // Mövcud tələbələr...
            
            // YENİ TƏLƏBƏ
            'yeni-telebe': {
              name: 'Yeni',
              surname: 'Tələbə',
              age: 24,
              profession: 'Frontend Developer',
              photo: '/images/students/yeni-telebe.jpg',
              projects: {
                'month-3': {
                  type: 'monthly',
                  month: 3,
                  title: 'E-commerce Platforması',
                  description: 'Tam funksional e-commerce tətbiqi',
                  skills: [
                    'React ilə frontend inkişafı',
                    'Node.js ilə backend API',
                    'MongoDB verilənlər bazası dizaynı'
                  ],
                  techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
                  images: [
                    '/images/projects/ecommerce-1.jpg',
                    '/images/projects/ecommerce-2.jpg'
                  ],
                  githubUrl: 'https://github.com/yeni-telebe/ecommerce',
                  liveUrl: 'https://ecommerce-demo.com',
                  date: '2024-11-15'
                },
                'final': {
                  type: 'final',
                  title: 'AI Chatbot Sistemi',
                  description: 'Müştəri xidmətləri üçün AI chatbot',
                  skills: [
                    'Natural Language Processing',
                    'Machine Learning modelləri',
                    'Real-time chat sistemi'
                  ],
                  techStack: ['Python', 'TensorFlow', 'Flask', 'WebSocket'],
                  images: [
                    '/images/projects/chatbot-1.jpg',
                    '/images/projects/chatbot-2.jpg'
                  ],
                  githubUrl: 'https://github.com/yeni-telebe/ai-chatbot',
                  liveUrl: 'https://chatbot-demo.com',
                  date: '2024-12-20'
                }
              }
            }
          }
        }
      }
    }
  }
};
```

## 🖼️ Şəkil Hazırlığı

### Tələbə Şəkilləri:
1. Professional görünüş
2. Yüksək keyfiyyət
3. Kvadrat format (1:1 nisbət)
4. Minimal fon

### Layihə Şəkilləri:
1. Layihənin əsas ekranları
2. Responsive dizayn nümunələri
3. Funksional elementlər
4. Yüksək keyfiyyət screenshots

## 🚀 Yeni Portfolio Əlavə Etmək - Addım-addım

### Addım 1: Şəkilləri Hazırlayın
- Tələbə şəklini `public/images/students/` qovluğuna əlavə edin
- Layihə şəkillərini `public/images/projects/` qovluğuna əlavə edin

### Addım 2: Məlumatları Əlavə Edin
- `src/data/portfolios.js` faylını açın
- Yuxarıdakı strukturu izləyərək yeni tələbə məlumatlarını əlavə edin

### Addım 3: Yoxlayın
- Tətbiqi işə salın (`npm run dev`)
- Portfolio səhifəsinə keçin
- Yeni tələbənin göründüyünü yoxlayın

### Addım 4: Test Edin
- Filterlərin işlədiyini yoxlayın
- Şəkillərin düzgün yükləndiğini yoxlayın
- Linklərinin işlədiyini yoxlayın

## 📝 Qeydlər

- Bütün mətn sahələri Azərbaycan dilində olmalıdır
- Texnologiya adları orijinal şəkildə yazılmalıdır (məs: "React", "Java")
- Tarixlər YYYY-MM-DD formatında olmalıdır
- URL-lər https:// ilə başlamalıdır
- Şəkil faylları optimize edilmiş olmalıdır

## 🔄 Yeniləmələr

Portfolio sistemi avtomatik olaraq yenilənir. Məlumatları `portfolios.js` faylında dəyişdikdən sonra səhifəni yeniləyin.

## 📞 Kömək

Əgər portfolio əlavə edərkən problem yaşayırsınızsa, bu qeydləri yoxlayın:

1. Şəkil fayllarının düzgün yerdə olduğunu yoxlayın
2. JSON sintaksisinin düzgün olduğunu yoxlayın
3. Bütün tələbi sahələrin doldurulduğunu yoxlayın
4. Fayl adlarının düzgün yazıldığını yoxlayın

## 🎯 Məsləhətlər

- Layihə təsvirlərini aydın və məzmunlu yazın
- Bacarıqları konkret və faydalı göstərin
- Keyfiyyətli şəkillər istifadə edin
- GitHub və demo linklərini yoxlayın 