import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';

interface CatalogCategoryPaginationProps {
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const CatalogCategoryPagination: React.FC<CatalogCategoryPaginationProps> = ({
  page,
  setPage,
  itemsPerPage,
  totalItems,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryValue = searchParams.get('query');

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  function generatePaginationLink(
    location: { pathname: string },
    queryValue: string | null,
    item: { page: number | null },
  ) {
    const basePath = location?.pathname || '';
    const search = new URLSearchParams(window.location.search);
    search.delete('page');

    const page = item.page || 1;
    if (page === 1) {
      const query = queryValue ? `?query=${queryValue}` : `?${search}`;
      return `${basePath}${query}`;
    }

    const query = queryValue ? `&query=${queryValue}&` : `&${search}`;
    return `${basePath}?page=${page}${query}`;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, num) => setPage(num)}
        showFirstButton
        showLastButton
        boundaryCount={1}
        siblingCount={1}
        size="small"
        className="custom-pagination"
        renderItem={(item) => {
          if (item.type === 'first') {
            return (
              <PaginationItem
                component={Link}
                to={generatePaginationLink(location, queryValue, item)}
                {...item}
                sx={{
                  color: '#8a8a8d',
                  bgcolor: '#0c0c0c',
                  borderRadius: '0',
                  margin: '0',
                  '&:hover': {
                    bgcolor: '#fb9118',
                    color: '#0c0c0c',
                  },
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                }}
              />
            );
          }
          if (item.type === 'last') {
            return (
              <PaginationItem
                component={Link}
                to={generatePaginationLink(location, queryValue, item)}
                {...item}
                sx={{
                  color: '#8a8a8d',
                  bgcolor: '#0c0c0c',
                  borderRadius: '0',
                  margin: '0',
                  '&:hover': {
                    bgcolor: '#fb9118',
                    color: '#0c0c0c',
                  },
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
                }}
              />
            );
          }

          return (
            <PaginationItem
              component={Link}
              to={generatePaginationLink(location, queryValue, item)}
              {...item}
              sx={{
                color: '#8a8a8d',
                bgcolor: '#0c0c0c',
                borderRadius: '0',
                margin: '0',
                '&.MuiPaginationItem-ellipsis': {
                  color: '#fb9118',
                  // bgcolor: '#fb9118',
                },
                '&:hover': {
                  bgcolor: '#fb9118',
                  color: '#0c0c0c',
                },
                '&.Mui-selected': {
                  bgcolor: '#fb9118',
                  color: '#0c0c0c',
                  '&:hover': {
                    bgcolor: '#fb9118',
                    color: '#0c0c0c',
                  },
                },
                // Additional styles for regular pages
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default CatalogCategoryPagination;
