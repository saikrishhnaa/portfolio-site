import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: 'g7rfa2u7',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'sker2I3OOkKlpd8lf6ZzJ9rff2ssTZyWj2uUHcUZQkiBlBrsvbd18CwCLqLuq3WHMhnWF3EC1rLAd2oF7ygO8Je2Nq7W6GeifYTfN8EgUwtBQiM7cxTRVsluJ4Dp5rW27iCt0IHOd6MUnDTEciMnj3epN1PZE14TvByVzwA2my9qAwtbCQ7D',
  useCdn: false,
});

async function uploadImage(filePath, filename) {
  const fileBuffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', fileBuffer, { filename });
  console.log(`✅ Uploaded image: ${filename} → ${asset._id}`);
  return asset._id;
}

async function migrate() {
  console.log('🚀 Starting full portfolio data migration to Sanity...\n');

  // ─── 1. SITE CONFIG ─────────────────────────────────────────────────────────
  console.log('📌 Migrating Site Config...');
  await client.createOrReplace({
    _id: 'siteConfig',
    _type: 'siteConfig',
    githubUrl: 'https://github.com/saikrishhnaa',
    linkedinUrl: 'https://www.linkedin.com/in/saikrishna-makam-4260351b3/',
  });
  console.log('✅ Site Config done\n');

  // ─── 2. HERO ────────────────────────────────────────────────────────────────
  console.log('📌 Migrating Hero section (with avatar image upload)...');
  
  // Upload the avatar image file
  const avatarPath = path.join(__dirname, '..', 'src', 'assets', 'avatar_lilac2_pixel.png');
  let avatarAssetId;
  try {
    avatarAssetId = await uploadImage(avatarPath, 'avatar_lilac2_pixel.png');
  } catch (e) {
    console.warn('⚠️  Avatar image not found at expected path, skipping image upload:', e.message);
  }

  await client.createOrReplace({
    _id: 'heroContent',
    _type: 'hero',
    subtitle: 'Senior Software Engineer',
    title: 'I build scalable applications and turn complex problems into simple, reliable experiences.',
    description: 'With 5 years of experience across React, Vue.js, C#, ASP.NET, and .NET Core, I focus on clean architecture, high-performance systems, and code that lasts. My work balances frontend precision with solid backend design.\nI lead with ownership from idea to production, ensuring every detail is intentional, efficient, and built to scale.',
    avatarCaption: 'Code, coffee, and a lot of debugging',
    tags: [
      { text: 'System design', colorClass: 'yellow', ribbonClass: 'ribbon-arrow' },
      { text: 'Clean code', colorClass: 'purple', ribbonClass: 'ribbon-double' },
      { text: 'Performance optimization', colorClass: 'blue', ribbonClass: 'ribbon' },
      { text: 'Product-focused engineering', colorClass: 'green', ribbonClass: 'ribbon-slant' },
      { text: 'Customer-focused solutions', colorClass: 'pink', ribbonClass: 'ribbon-notch' },
    ],
    ...(avatarAssetId ? {
      avatarImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: avatarAssetId }
      }
    } : {}),
  });
  console.log('✅ Hero done\n');

  // ─── 3. TRAJECTORY ──────────────────────────────────────────────────────────
  console.log('📌 Migrating Trajectory entries...');
  await client.createOrReplace({
    _id: 'trajectory-lenze',
    _type: 'trajectory',
    order: 1,
    year: 'Sep 2021 - Present',
    role: 'Senior Software Engineer @ Lenze',
    logoBg: '#FDE68A',
    logoText: 'CA',
    bullets: [
      'Designed and developed scalable, high-performance web applications using React.js, Vue.js, TypeScript, C#, ASP.NET, and .NET Core, ensuring clean architecture, reusability, and maintainability.',
      'Built responsive and user-centric interfaces leveraging modern UI frameworks such as Tailwind CSS, Quasar, and Ant Design Vue.',
      'Developed and integrated REST, GraphQL, and gRPC APIs to enable efficient and reliable communication between frontend and backend systems.',
      'Improved application security by implementing best practices to mitigate vulnerabilities such as XSS and SQL Injection.',
      'Deployed and managed applications using Docker and Microsoft Azure, ensuring scalability, reliability, and smooth delivery pipelines.',
      'Owned end-to-end feature delivery, including requirement analysis, system design, development, testing, and production support.',
      'Conducted code reviews, mentored team members, and contributed to technical interviews and hiring.',
    ],
  });
  await client.createOrReplace({
    _id: 'trajectory-cuelogic',
    _type: 'trajectory',
    order: 2,
    year: 'Feb 2021 - Sep 2021',
    role: 'Software Engineer Intern @ Cuelogic Technologies | An LTI Company',
    logoBg: '#FFFFFF',
    logoText: 'SX',
    bullets: [
      'Gained hands-on experience in web development by working with HTML, CSS, JavaScript, Python, and Flask through structured training and practical assignments.',
      'Successfully designed and delivered a POC application, demonstrating end-to-end development using frontend and backend technologies.',
    ],
  });
  console.log('✅ Trajectory done\n');

  // ─── 4. TECH STACK CATEGORIES ────────────────────────────────────────────────
  console.log('📌 Migrating Tech Stack Categories (text data only)...');
  const techCategories = [
    {
      _id: 'techstack-languages',
      _type: 'techStackCategory',
      order: 1,
      categoryName: 'Languages',
      technologies: [
        { _key: 'js', name: 'JavaScript' },
        { _key: 'ts', name: 'TypeScript' },
        { _key: 'csharp', name: 'C#' },
        { _key: 'java', name: 'Java' },
        { _key: 'cpp', name: 'C++' },
      ],
    },
    {
      _id: 'techstack-frontend',
      _type: 'techStackCategory',
      order: 2,
      categoryName: 'Frontend',
      technologies: [
        { _key: 'react', name: 'React' },
        { _key: 'vue', name: 'Vue.js' },
      ],
    },
    {
      _id: 'techstack-backend',
      _type: 'techStackCategory',
      order: 3,
      categoryName: 'Backend & Cloud',
      technologies: [
        { _key: 'dotnet', name: '.NET / ASP.NET' },
        { _key: 'docker', name: 'Docker' },
        { _key: 'db', name: 'Databases' },
        { _key: 'git', name: 'Git' },
      ],
    },
  ];

  for (const cat of techCategories) {
    await client.createOrReplace(cat);
    console.log(`  ✅ Category: ${cat.categoryName}`);
  }
  console.log('✅ Tech Stack done\n');

  console.log('🎉 All text data migrated successfully!');
  console.log('⚠️  NOTE: Tech Stack icons need to be uploaded manually in Sanity Studio.\n');
  console.log('   Open the Studio → Tech Stack Category → each item → upload an icon image.');
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
