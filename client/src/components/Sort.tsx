import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hook';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Services from './Services';
import { setCurrentFilters, delFilters } from '../redux/slices/sortSlice';

import { setData } from '../redux/slices/categorySlice';

import { IProducts } from '../redux/slices/categorySlice';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Sort: React.FC = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const { category } = useParams();
  const { currentFilters, currentSort } = useAppSelector((state) => state.sort);

  const dispatch = useAppDispatch();
  const Service = new Services();

  const [sizeW, setSizeW] = useState<string>('235px');
  const [mobW, setMobW] = useState<boolean>(false);
  const [clickOnLabel, setClickOnLabel] = useState<{ [key: string]: boolean }>({});
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);
  const [selectedCheckboxCounts, setSelectedCheckboxCounts] = useState<number[]>(
    Array(currentFilters.length).fill(0),
  );
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }[]>(
    currentFilters.map((filterItem) =>
      filterItem.filter_variants
        ? Object.fromEntries(filterItem.filter_variants.map((variant) => [variant, false]))
        : {},
    ),
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckboxChange = (variant: string, sortName: string, index: number) => {
    const urlSearchParams = new URLSearchParams(location.search);
    const currentValue = urlSearchParams.get(sortName);

    if (currentValue) {
      const values = currentValue.split(' ');
      const isVariantPresent =
        values.includes(variant) || values.includes(variant.replace(/ /g, '+'));

      if (isVariantPresent) {
        const newValues = values.filter(
          (value) => value !== variant && value !== variant.replace(/ /g, '+'),
        );

        if (newValues.length === 0) {
          urlSearchParams.delete(sortName);
        } else {
          urlSearchParams.set(sortName, newValues.join(' '));
        }
      } else {
        urlSearchParams.set(sortName, `${currentValue} ${variant.replace(/ /g, '+')}`);
      }
    } else {
      urlSearchParams.set(sortName, variant.replace(/ /g, '+'));
    }

    navigate({ search: urlSearchParams.toString() });

    setCheckedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = {
        ...newStates[index],
        [variant]: !newStates[index][variant],
      };
      return newStates;
    });
  };

  useEffect(() => {
    if (urlParams && currentFilters) {
      const newCheckedState: { [key: string]: boolean }[] = [...checkedStates];
      currentFilters.forEach((filterItem, index) => {
        if (filterItem.filter_variants) {
          filterItem.filter_variants.forEach((variant) => {
            const variantWithPlus = variant.replace(/ /g, '+');
            const sortParamValue = urlParams.get(filterItem.filter_name);

            const isVariantChecked =
              sortParamValue &&
              (sortParamValue.split(' ').includes(variant) ||
                sortParamValue.split(' ').includes(variantWithPlus));

            newCheckedState[index] = {
              ...newCheckedState[index],
              [variant]: !!isVariantChecked,
            };
          });
        }
        if (newCheckedState[index]) {
          const newSelectedCount = Object.values(newCheckedState[index]).filter(
            (value) => value,
          ).length;
          setSelectedCheckboxCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = newSelectedCount;
            return newCounts;
          });
        }
      });

      setCheckedStates(newCheckedState);
    }
  }, [urlParams, currentFilters]);

  const handleWindowResize = () => {
    if (window.innerWidth <= 950) {
      setSizeW('100%');
      setMobW(true);
    } else {
      setSizeW('235px');
      setMobW(false);
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    const parsedSearchParams = new URLSearchParams(location.search);
    setUrlParams(parsedSearchParams);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const foundCategory = categories.find((item) => item.category_link === category);
      const categoryToUse = foundCategory ? foundCategory.category_name : '1. Все товары';
      Service.getSorts(categoryToUse).then((data) => {
        if (data) {
          dispatch(setCurrentFilters(data));
        }
      });
    }

    if (currentFilters.length > 0) {
      const tempObj: { [key: string]: boolean } = {};

      currentFilters.forEach((item, index) => {
        index > 1 ? (tempObj[item.filter_name] = false) : (tempObj[item.filter_name] = true);
      });
      setClickOnLabel(tempObj);
    }
  }, [category, categories, currentFilters.length]);

  useEffect(() => {
    const parsedSearchParams = new URLSearchParams(location.search);
    setUrlParams(parsedSearchParams);
  }, [location.search]);

  return (
    <div className="sort">
      <div className="sort__container">
        {currentFilters &&
          currentFilters.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                '&.MuiBox-root': {
                  backgroundColor: mobW ? 'transparent' : '#0c0c0c',
                  borderRadius: '5px',
                  border: 'none',
                },
              }}>
              <FormControl
                sx={{
                  '&.MuiFormControl-root': {
                    width: sizeW,
                    backgroundColor: mobW ? 'transparent' : '#0c0c0c',
                    borderRadius: '5px',
                    border: 'none',
                    margin: '0',
                  },
                }}
                component="fieldset"
                variant="standard">
                <FormLabel
                  onClick={() => {
                    setClickOnLabel({
                      ...clickOnLabel,
                      [currentFilters[index].filter_name]:
                        !clickOnLabel[currentFilters[index].filter_name],
                    });
                  }}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: index === 0 ? '0 0 10px' : '10px 0',

                    '&.MuiFormLabel-root': {
                      color: clickOnLabel[currentFilters[index].filter_name]
                        ? '#fa9017'
                        : '#8a8a8d',
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      userSelect: 'none',
                      transition: 'ease-in-out 0.2s all',
                      '&:hover': {
                        color: '#fa9017',
                        cursor: 'pointer',
                      },
                      // marginBottom: '5px',
                    },
                  }}
                  component="legend">
                  {currentFilters[index].filter_name}{' '}
                  <span
                    style={{
                      color: clickOnLabel[currentFilters[index].filter_name]
                        ? '#fa9017'
                        : '#8a8a8d',
                    }}>
                    {selectedCheckboxCounts[index] > 0 && selectedCheckboxCounts[index]}{' '}
                    {clickOnLabel[currentFilters[index].filter_name] ? '\u25B2' : '\u25BC'}
                  </span>
                </FormLabel>
                {currentFilters[index].filter_variants && (
                  <FormGroup
                    sx={{
                      display: clickOnLabel[currentFilters[index].filter_name] ? 'flex' : 'none',
                      '&.MuiFormGroup-root': {
                        width: '100%',
                        backgroundColor: mobW ? 'transparent' : '#161616',
                        borderRadius: '10px',
                      },
                    }}>
                    {currentFilters[index].filter_variants.map((variant) => (
                      <FormControlLabel
                        key={variant}
                        control={
                          <Checkbox
                            size="small"
                            checked={
                              checkedStates[index] && checkedStates[index][variant] !== undefined
                                ? checkedStates[index][variant]
                                : false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                variant,
                                currentFilters[index].filter_name,
                                index,
                              )
                            }
                            name={variant}
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fill: '#fa9017',
                              },
                            }}
                          />
                        }
                        label={variant}
                        sx={{
                          '&.MuiFormControlLabel-root': {
                            borderRadius: '5px',
                            margin: '0',
                          },
                          '& .MuiFormControlLabel-label': {
                            color: '#fa9017',
                            fontFamily: 'Rubik',
                            fontSize: '14px',
                          },
                        }}
                      />
                    ))}
                  </FormGroup>
                )}
              </FormControl>
            </Box>
          ))}
        <div className="sort__buttons">
          <div
            onClick={() => {
              navigate(`/catalog/${category}?sort=${currentSort}`);
            }}>
            Очистить фильтры
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
