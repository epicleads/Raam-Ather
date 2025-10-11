# Fireworks Effect - Debugging Guide

## What Should Happen:

When you refresh the homepage (`/`):
1. **After 500ms**: Fireworks start appearing
2. **Duration**: Runs for 8 seconds
3. **Launch Speed**: Every 250ms (desktop) / 400ms (mobile) - FAST!
4. **Effect**: Colorful rockets launch from bottom, burst into particles
5. **Rockets Per Burst**: 5 rockets (desktop) / 4 rockets (mobile)

---

## How to Debug:

### Step 1: Open Browser Console
Press `F12` or right-click → Inspect → Console tab

### Step 2: Look for These Logs (in order):

```
🎆 Fireworks Wrapper Mounted - Starting in 500ms
🎆 Canvas Dimensions Updated: {...}
🎆 Fireworks Starting Now!
🎆 Rendering Fireworks Component
🎆 Fireworks Active - will stop in 8 seconds
🎆 Fireworks Rendering Canvas
🎆 Fireworks Check: {...}
🎆 Fireworks Canvas Initialized: {...}
🎆 First Rocket Launched! {...}
```

### Step 3: Check What's Missing

**If you see:**
- ✅ "Fireworks Wrapper Mounted" → Wrapper loaded correctly
- ✅ "Canvas Dimensions Updated" → Dimensions calculated
- ✅ "Fireworks Starting Now!" → Timer worked
- ✅ "Fireworks Canvas Initialized" → Canvas ready
- ✅ "First Rocket Launched!" → Animation started

**If something is missing:**
- ❌ No "Wrapper Mounted" → Component not rendering at all
- ❌ "Canvas Dimensions: width: 0" → Window dimensions not detected
- ❌ "Fireworks Check: isActive: false" → Already inactive
- ❌ No "First Rocket Launched" → Animation not starting

---

## Common Issues & Solutions:

### Issue 1: No Logs at All
**Solution:** Component not imported properly
- Check `page.tsx` has the import
- Verify the component is placed outside `<main>` tag

### Issue 2: Canvas Width is 0
**Solution:** Window not ready
- Refresh the page again
- Check browser console for JavaScript errors

### Issue 3: Fireworks Not Visible
**Solution:** Z-index or rendering issue
- Check z-index is `9998` (very high)
- Verify canvas has `pointer-events-none`
- Look for `position: fixed` on canvas container

### Issue 4: Animation Stops Immediately
**Solution:** Check the 5-second timer
- Timer should be 5000ms
- Verify `isActive` state

---

## Manual Test:

Open browser console and run:
```javascript
// Check if component is in DOM
document.querySelector('canvas')

// Should return a canvas element if fireworks are active
```

---

## Files Created:

1. `src/app/Components/effects/FestiveRockets.tsx` - Main animation
2. `src/app/Components/effects/FestiveRocketsWrapper.tsx` - Wrapper with timing
3. `src/app/Components/effects/index.ts` - Exports
4. Updated `src/app/page.tsx` - Integrated fireworks

---

## Expected Behavior:

- Fireworks start 500ms after page load
- Run for 8 seconds total
- Launch rockets every 250ms (desktop) / 400ms (mobile) - FAST!
- Show colorful Diwali-themed fireworks (gold, orange, pink, green, red, purple)
- 5 rockets per burst on desktop, 4 on mobile
- Then automatically stop to save performance
- Does NOT block any user interaction (pointer-events-none)

---

Last Updated: October 11, 2025

