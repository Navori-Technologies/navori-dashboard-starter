import type { ExtendedColumnFilter, FilterOperator, FilterVariant } from '@/types/data-table';
import {
  type Column,
  type RowData,
  columnFacetingFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFacetedMinMaxValues,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures
} from '@tanstack/react-table';

import { dataTableConfig } from '@/config/data-table';

export const dataTableFeatures = tableFeatures({
  rowSelectionFeature,
  columnVisibilityFeature,
  columnOrderingFeature,
  columnSizingFeature,
  columnPinningFeature,
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  columnFacetingFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel()
});

export type DataTableFeatures = typeof dataTableFeatures;

export function getCommonPinningStyles<TData extends RowData>({
  column
}: {
  column: Column<DataTableFeatures, TData>;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastStartPinnedColumn = isPinned === 'start' && column.getIsLastColumn('start');
  const isFirstEndPinnedColumn = isPinned === 'end' && column.getIsFirstColumn('end');

  return {
    boxShadow: isLastStartPinnedColumn
      ? '-5px 0 5px -5px var(--border) inset'
      : isFirstEndPinnedColumn
        ? '5px 0 5px -5px var(--border) inset'
        : undefined,
    left: isPinned === 'start' ? `${column.getStart('start')}px` : undefined,
    right: isPinned === 'end' ? `${column.getAfter('end')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    background: isPinned ? 'var(--background)' : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0
  };
}

export function getFilterOperators(filterVariant: FilterVariant) {
  const operatorMap: Record<FilterVariant, { label: string; value: FilterOperator }[]> = {
    text: dataTableConfig.textOperators,
    number: dataTableConfig.numericOperators,
    range: dataTableConfig.numericOperators,
    date: dataTableConfig.dateOperators,
    dateRange: dataTableConfig.dateOperators,
    boolean: dataTableConfig.booleanOperators,
    select: dataTableConfig.selectOperators,
    multiSelect: dataTableConfig.multiSelectOperators
  };

  return operatorMap[filterVariant] ?? dataTableConfig.textOperators;
}

export function getDefaultFilterOperator(filterVariant: FilterVariant) {
  const operators = getFilterOperators(filterVariant);

  return operators[0]?.value ?? (filterVariant === 'text' ? 'iLike' : 'eq');
}

export function getValidFilters<TData>(
  filters: ExtendedColumnFilter<TData>[]
): ExtendedColumnFilter<TData>[] {
  return filters.filter(
    (filter) =>
      filter.operator === 'isEmpty' ||
      filter.operator === 'isNotEmpty' ||
      (Array.isArray(filter.value)
        ? filter.value.length > 0
        : filter.value !== '' && filter.value !== null && filter.value !== undefined)
  );
}
