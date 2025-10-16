import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import countries from '../../data/countriesWithCodes.json';

const { Option } = Select;

const CountrySelect: React.FC<SelectProps> = (props) => {
  return (
    <Select
      {...props}
      showSearch
      // 👇 LA LÍNEA CORREGIDA ESTÁ AQUÍ 👇
      filterOption={(input, option) =>
        String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    >
      {countries.map(country => (
        <Option key={country.code} value={country.name} label={country.name}>
          <img
            src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
            alt={`${country.name} flag`}
            style={{ marginRight: '10px', verticalAlign: 'middle' }}
          />
          {country.name}
        </Option>
      ))}
    </Select>
  );
};

export default CountrySelect;