# MentorLagbe --- Short Development Roadmap

> **লক্ষ্য:** এক নজরে দেখে বুঝবে কোন কাজের পর কোন কাজ করবে। প্রতিটি ধাপ শেষ
> হলে পরের ধাপে যাবে।
asdfsadfsadfdsdfs
## ১. Project Setup

-   Frontend ও Backend project structure তৈরি/যাচাই।
-   `.env.local` ও `.env` configure করবে; secret GitHub-এ দেবে না।
-   আগে existing architecture বুঝবে, অপ্রয়োজনীয় package install করবে না।
 
## ২. Navbar

-   Logo, Home, Browse Tuitions, Pricing, Sign In, Sign Up link বসাবে।
-   Login হলে avatar, name, role ও Dashboard দেখাবে।
-   Mobile menu responsive করবে।

## ৩. Home Page Banner / Hero

-   Headline, short description ও Browse CTA তৈরি করবে।
-   CTA থেকে `/tuitions` page-এ যাবে।
-   Desktop ও mobile layout ঠিক করবে।

## ৪. Sign Up

-   Name, Email, Password ও Student/Tutor role নেবে।
-   Validation করে BetterAuth দিয়ে account তৈরি করবে।
-   নতুন user-এর default plan হবে `free`।

## ৫. Sign In

-   Email ও Password দিয়ে login করবে।
-   Login-এর পর role অনুযায়ী dashboard-এ পাঠাবে।
-   Error ও success toast দেখাবে।

## ৬. Profile

-   Name, Phone, Bio ও Profile Image দেখাবে/edit করবে।
-   ImgBB-তে image file upload করবে; শুধু URL paste নয়।
-   Update-এর পর user data refresh করবে।

## ৭. Home Page-এর বাকি Section

-   Latest 6 approved tuition card দেখাবে।
-   Pricing, How It Works, Top Subjects/Stats section যোগ করবে।
-   Card-এর data API থেকে আনবে; hardcode করবে না।

## ৮. Backend ও Database

-   Express server এবং MongoDB connection তৈরি/যাচাই।
-   `users`, `tuitions`, `applications`, `payments` --- চারটি
    collection-এর data structure ঠিক করবে।
-   BetterAuth adapter-এর collection behavior আগে যাচাই করবে; ৪
    collection requirement নিয়ে conflict থাকলে clarification নেবে।

## ৯. Authentication Security

-   JWT verify করার `verifyToken` middleware বানাবে।
-   Role check-এর জন্য `verifyStudent`, `verifyTutor`, `verifyAdmin`
    বানাবে।
-   Frontend নয়, protected API-তেও role ও ownership verify করবে।

## ১০. Browse Tuitions

-   শুধু `approved` এবং `isActive: true` tuition দেখাবে।
-   Search: title/subject-এর জন্য MongoDB `$regex` বা উপযুক্ত text search
    ব্যবহার করবে।
-   Filter: `classLevel`, `mode`; query parameter backend-এ পাঠাবে।
-   Pagination করলে `skip((page - 1) * limit)` এবং `limit` ব্যবহার করবে।

## ১১. Tuition Details

-   `/tuitions/[id]` থেকে নির্দিষ্ট tuition-এর details দেখাবে।
-   Tutor info, fee, schedule, mode ও description দেখাবে।
-   Invalid ID বা না পাওয়া data হলে not-found state দেখাবে।

## ১২. Tutor Dashboard

-   Total posts, approved/active posts ও applicants count দেখাবে।
-   Free Tutor সর্বোচ্চ ২টি post করতে পারবে; Pro Tutor unlimited।
-   Dashboard sidebar ও mobile layout তৈরি করবে।

## ১৩. Post Tuition

-   Title, Subject, Class, Mode, Location, Fee, Days/Week ও Description
    form নেবে।
-   ImgBB-তে banner file upload করবে।
-   নতুন post `approvalStatus: "pending"` দিয়ে save করবে।

## ১৪. My Tuitions

-   Tutor শুধু নিজের tuition list দেখবে।
-   Edit, Delete এবং Active/Closed toggle করবে।
-   Backend-এ `tutorEmail`/owner verify করবে।

## ১৫. Student Apply

-   শুধু Student Apply করতে পারবে।
-   Phone, Preferred Schedule ও Learning Note নেবে।
-   একই Student যেন একই tuition-এ দ্বিতীয়বার apply করতে না পারে।

## ১৬. Student Dashboard

-   Total Applied, Accepted ও Pending count দেখাবে।
-   My Applications-এ নিজের application ও status দেখাবে।
-   শুধু `pending` application cancel করতে দেবে।

## ১৭. Tutor Applicants

-   Tutor শুধু নিজের tuition-এর applicants দেখবে।
-   Student info ও application details দেখাবে।
-   Status `accepted` অথবা `rejected` করবে।

## ১৮. Admin Dashboard

-   Total Users, Tutors, Pending/Approved Tuitions ও Revenue দেখাবে।
-   Admin-only API দিয়ে data আনবে।
-   Admin ছাড়া অন্য role যেন access না পায়।

## ১৯. Admin Management

-   Users list ও role management তৈরি করবে।
-   Tuitions list থেকে Approve/Reject করবে।
-   Transactions list-এ payment details দেখাবে।

## ২০. Pricing ও Stripe

-   Student Pro price `$10`; Tutor Pro price `$15`।
-   Backend থেকে Stripe Checkout Session তৈরি করবে।
-   Verified webhook/session-এর পর user plan `pro` করবে এবং `payments`
    record save করবে।
-   Client-এর পাঠানো amount বিশ্বাস করবে না।

## ২১. Common UI & Error Handling

-   Loading skeleton, empty state ও error state যোগ করবে।
-   `not-found.tsx` ও `error.tsx` তৈরি করবে।
-   Form/API action-এ consistent toast দেখাবে।

## ২২. Optional Features

Mandatory কাজ শেষ হলে ২--৫টি বেছে নেবে: - Server-side pagination -
Realistic seed data - Saved/Bookmarked Tuitions - Dark/Light theme -
Accepted Student-এর Review & Rating

## ২৩. Seed Data ও Final Testing

-   কমপক্ষে ১০--১২টি realistic approved tuition seed করবে।
-   Student, Tutor ও Admin --- তিন role দিয়ে পুরো flow test করবে।
-   Search/filter, image upload, JWT security ও Stripe test করবে।

## ২৪. Deployment ও Submission

-   Frontend ও Backend deploy করে environment variables set করবে।
-   সব route refresh, private route refresh, CORS ও API error test করবে।
-   README, live link, admin/tutor demo credentials ও GitHub links প্রস্তুত
    করবে।
-   Client-এ ২০+ এবং Server-এ ১২+ meaningful commits নিশ্চিত করবে।

------------------------------------------------------------------------

**মনে রাখবে:** প্রতিটি ধাপে আগে logic বোঝো, ছোট task approve করো,
implement করো, test করো---তারপর পরের ধাপে যাও। `AI_CODING_RULES.md` ও
`PROJECT_BRIEF.md` সবসময় অনুসরণ করবে।
