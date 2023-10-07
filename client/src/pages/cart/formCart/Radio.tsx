import * as React from 'react';
import Box from '@mui/system/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

interface IRadioForCart {
  setPickup: (pickup: boolean) => void;
  setCdek: (cdek: boolean) => void;
  setDelivery: (delivery: boolean) => void;
  justify: string;
  setJustify: (justify: string) => void;
}

const RadioForCart: React.FC<IRadioForCart> = ({
  setPickup,
  setCdek,
  setDelivery,
  justify,
  setJustify,
}) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === 'Самовывоз') {
      setPickup(true);
      setCdek(false);
      setDelivery(false);
    } else if (value === 'Доставка') {
      setPickup(false);
      setCdek(false);
      setDelivery(true);
    } else if (value === 'СДЕК') {
      setPickup(false);
      setCdek(true);
      setDelivery(false);
    }

    setJustify(value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <RadioGroup
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="justify"
        value={justify}
        onChange={handleRadioChange}
        sx={{
          minHeight: 48,
          padding: '4px',
          borderRadius: '7px',
          bgcolor: '#0c0c0c',
          '--RadioGroup-gap': '4px',
          '--Radio-action-radius': '8px',
          width: '100%',
        }}>
        {['Самовывоз', 'Доставка', 'СДЕК'].map((item) => (
          <Radio
            key={item}
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              flex: 1,
              px: 2,
              alignItems: 'center',

              '& .MuiRadio-label': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fa9017',
              },
              '& .MuiRadio-action': {
                '&:hover': {
                  borderRadius: '5px',
                  bgcolor: '#161616',
                },
                '&:active': {
                  borderRadius: '5px',
                  bgcolor: '#161616',
                },
              },
              '& .MuiRadio-input': {
                '&:hover': {
                  borderRadius: '5px',
                  bgcolor: '#161616',
                },
                '&:active': {
                  borderRadius: '5px',
                  bgcolor: '#161616',
                },
              },
              '& .MuiRadio-radio': {
                '&:hover': {
                  borderRadius: '5px',
                  bgcolor: '#161616',
                },
                '&:active': {
                  borderRadius: '5px',
                  bgcolor: '#161616',
                },
              },
              '&.Mui-checked': {
                bgcolor: '#161616',
                borderRadius: '5px',
                '&:hover': {
                  bgcolor: '#161616',
                },
                '&:active': {
                  borderRadius: '5px',
                  bgcolor: '#161616',
                },
              },
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: '#161616',
                    borderRadius: '5px',
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default RadioForCart;
