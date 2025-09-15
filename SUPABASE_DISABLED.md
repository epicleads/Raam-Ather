# Supabase Temporarily Disabled

## Current Status
✅ **Supabase is temporarily disabled** - Your app will work without errors using fallback data
✅ **Website UI will display** - Using local hero data from `heroFallbackData.ts`
✅ **Admin UI will display** - But forms won't work until Supabase is configured

## What I've Done
1. **Disabled `supabaseClient.ts`** - Returns null instead of trying to connect
2. **Disabled `supabaseAdmin.ts`** - Returns null for admin operations
3. **Updated `fetchHeroData.ts`** - Automatically uses fallback data when Supabase is null
4. **Updated admin page** - Shows warning that Supabase is disabled
5. **Updated API route** - Returns helpful error message instead of crashing

## How to Re-enable Supabase Later

### 1. Update your `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Re-enable the clients:
- **Uncomment** the code in `src/lib/supabaseClient.ts`
- **Uncomment** the code in `src/lib/supabaseAdmin.ts`

### 3. Restart your dev server:
```bash
npm run dev
```

## Current Behavior
- **Homepage**: Shows hero content from fallback data
- **Admin page**: Shows UI but forms return "Supabase disabled" error
- **No crashes**: App gracefully handles missing Supabase

Your app is now ready to run without Supabase errors! 🎉
