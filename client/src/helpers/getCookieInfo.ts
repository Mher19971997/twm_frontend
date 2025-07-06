// export function getCookieValue(name: string): string | null {
//   const cookies = document?.cookie.split('; ');
//   const cookie = cookies.find(row => row.startsWith(name + '='));
//   return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
// }

// import { useEffect, useState } from 'react';

export function useCookieValue(name: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(row => row.startsWith(name + '='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
}