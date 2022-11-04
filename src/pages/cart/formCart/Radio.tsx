import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

interface IRadioForCart {
  setDelivery: (delivery: boolean) => void;
  justify: string;
  setJustify: (justify: string) => void;
}

const RadioForCart: React.FC<IRadioForCart> = ({ setDelivery, justify, setJustify }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <RadioGroup
        row
        aria-labelledby="segmented-controls-example"
        name="justify"
        value={justify}
        onChange={(event) => {
          event.target.value === 'Самовывоз' ? setDelivery(false) : setDelivery(true);
          setJustify(event.target.value);
        }}
        sx={{
          minHeight: 48,
          padding: '4px',
          borderRadius: 'md',
          bgcolor: '#0c0c0c',
          '--RadioGroup-gap': '4px',
          '--Radio-action-radius': '8px',
        }}>
        {['Самовывоз', 'Доставка', 'СДЕК'].map((item, index) => (
          <Radio
            key={item}
            color="neutral"
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              px: 2,
              alignItems: 'center',
            }}
            componentsProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: '#161616',
                    boxShadow: 'md',
                    '&:hover': {
                      bgcolor: '#161616',
                    },
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
