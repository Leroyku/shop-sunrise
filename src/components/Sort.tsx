import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hook';

import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

import {
  setCurrentSort,
  sortChange,
  removeSort,
  setChecked,
  removeChecked,
} from '../redux/slices/sortSlice';

interface ISort {
  category: string | undefined;
}

const Sort: React.FC<ISort> = ({ category }) => {
  const { currentSort, checked } = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeSort());
    dispatch(setCurrentSort({ category }));
  }, [category]);

  useEffect(() => {
    dispatch(removeChecked());
  }, [category, currentSort]);

  return (
    <div className="sort">
      <div className="sort__container">
        <Box className="sort__box">
          <Typography id="sandwich-group" level="body2" fontWeight="lg" mb={1} fontSize="22px">
            {currentSort.first_sort_name}
          </Typography>
          <Box className="sort__group" role="group" aria-labelledby="sandwich-group">
            <List size="sm">
              {currentSort.first_sort_variants.map((item, index) => (
                <ListItem key={index}>
                  <Checkbox
                    checked={
                      checked[0].length === currentSort.first_sort_variants.length
                        ? checked[0][index].item
                        : false
                    }
                    onChange={(e) => {
                      window.scroll({
                        left: 0,
                        top: 0,
                        behavior: 'smooth',
                      });

                      dispatch(setChecked({ i: 1, index }));

                      dispatch(
                        sortChange({
                          checked: e.target.checked,
                          label: e.target.labels ? e.target.labels[0].innerHTML : '',
                        }),
                      );
                    }}
                    className="sort__checkbox"
                    label={item}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box className="sort__box">
          <Typography id="sandwich-group" level="body2" fontWeight="lg" mb={1} fontSize="22px">
            {currentSort.second_sort_name}
          </Typography>
          <Box className="sort__group" role="group" aria-labelledby="sandwich-group">
            <List size="sm">
              {currentSort.second_sort_variants.map((item, index) => (
                <ListItem key={index}>
                  <Checkbox
                    checked={
                      checked[1].length === currentSort.second_sort_variants.length
                        ? checked[1][index].item
                        : false
                    }
                    onChange={(e) => {
                      window.scroll({
                        left: 0,
                        top: 0,
                        behavior: 'smooth',
                      });
                      dispatch(setChecked({ i: 2, index }));

                      dispatch(
                        sortChange({
                          checked: e.target.checked,
                          label: e.target.labels ? e.target.labels[0].innerHTML : '',
                        }),
                      );
                    }}
                    className="sort__checkbox"
                    label={item}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Sort;
