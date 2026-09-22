'use client';

/**
 * Fully client-side hook for filtering navigation items based on the
 * signed-in user's role (see features/auth/hooks/use-session.ts, backed by
 * Keystone's `authenticatedItem.role`).
 *
 * Note: For actual security (API routes, server actions, GraphQL access
 * control), always enforce checks server-side — Keystone's own `access/*`
 * functions do this. This hook is only for UI visibility.
 */

import { useMemo } from 'react';
import { useSession } from '@/features/auth/hooks/use-session';
import type { NavItem, NavGroup } from '@/types';

/**
 * Hook to filter navigation items based on the user's role (fully client-side)
 *
 * @param items - Array of navigation items to filter
 * @returns Filtered items
 */
export function useFilteredNavItems(items: NavItem[]) {
  const { user } = useSession();
  const role = user?.role;

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => !item.access?.role || item.access.role === role)
      .map((item) => {
        if (item.items && item.items.length > 0) {
          return {
            ...item,
            items: item.items.filter(
              (childItem) => !childItem.access?.role || childItem.access.role === role
            )
          };
        }

        return item;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- items is expected to be a stable reference from nav-config
  }, [items, role]);

  return filteredItems;
}

/**
 * Hook to filter navigation groups based on the user's role (fully client-side)
 *
 * @param groups - Array of navigation groups to filter
 * @returns Filtered groups (empty groups are removed)
 */
export function useFilteredNavGroups(groups: NavGroup[]) {
  const allItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const filteredItems = useFilteredNavItems(allItems);

  return useMemo(() => {
    const filteredSet = new Set(filteredItems.map((item) => item.title));
    return groups
      .map((group) => ({
        ...group,
        items: filteredItems.filter((item) =>
          group.items.some((gi) => gi.title === item.title && filteredSet.has(gi.title))
        )
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, filteredItems]);
}
