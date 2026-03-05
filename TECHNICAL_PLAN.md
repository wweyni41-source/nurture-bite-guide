# LittleHabesha.com Technical Architecture Documentation

## 1. Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide-React.
- **Backend**: Next.js Server Actions & API Routes (Node.js runtime).
- **Authentication**: Clerk or NextAuth.js (Admin-only login).
- **Database**: PostgreSQL (Hosted on Supabase or Neon).
- **ORM**: Prisma for type-safe database access.
- **File Storage**: Cloudinary (Optimized images & videos) and AWS S3 (PDF resources).
- **Hosting**: Vercel.

## 2. Database Schema (Prisma Models)

```prisma
// Admin User Model
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}

// Kids Stories Model
model Story {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  coverImage  String
  content     String   @db.Text
  pdfUrl      String?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Kids Music Model
model Song {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  coverImage  String
  lyrics      String   @db.Text
  audioUrl    String?
  pdfUrl      String?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Baby Food Programs Model
model FoodProgram {
  id           String      @id @default(cuid())
  ageCategory  AgeCategory
  title        String
  framework    String      @db.Text
  pdfUrl       String?
  images       String[]    // List of image URLs
  published    Boolean     @default(false)
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

enum AgeCategory {
  MONTHS_6_8
  MONTHS_9_12
  MONTHS_12_18
  MONTHS_18_24
}
```

## 3. UI/UX Wireframe Breakdown
- **Homepage**: High-impact hero section + 4 main navigation cards with soft pastel icons.
- **Feeding Guide**: Tabbed interface based on `AgeCategory` for dynamic content rendering.
- **Stories/Music**: Clean grid layouts with cards featuring high-quality thumbnails and primary "Read/Listen" actions.
- **Admin Dashboard**:
  - **Sidebar/Tabs**: Navigation between Stories, Music, and Food Programs.
  - **Editor**: Rich-text area for story/lyric content.
  - **Uploader**: Drag-and-drop zone for cover images and PDFs.
  - **Content Management**: Status badges (Published/Draft) and quick actions (Edit/Delete).

## 4. Project Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Initialize Next.js project with Tailwind CSS.
- [ ] Setup Database schema and Prisma ORM.
- [ ] Configure Authentication (Clerk/NextAuth).
- [ ] Implement global design system (Colors, Fonts).

### Phase 2: Core Frontend (Week 2)
- [ ] Build responsive Navigation and Footer.
- [ ] Design Homepage and About Us page.
- [ ] Implement Story and Song list pages with mock data.
- [ ] Build the Baby Food Guide age-category navigator.

### Phase 3: Admin Backend (Week 3)
- [ ] Build Admin Dashboard layout.
- [ ] Implement CRUD operations for Stories.
- [ ] Implement CRUD operations for Songs.
- [ ] Implement CRUD operations for Food Programs.
- [ ] Integrate Cloudinary for image/PDF uploads.

### Phase 4: Dynamic Integration & SEO (Week 4)
- [ ] Connect Frontend pages to real database content.
- [ ] Implement Dynamic Routing for Story/Song details.
- [ ] SEO optimization (Metadata, Sitemap).
- [ ] Final testing and bug fixes.
- [ ] Deploy to Production (Vercel).