import React from 'react'
import { Input, Label, Select, Button } from 'semantic-ui-react'

const options = [
    { key: 'USD', text: 'USD', value: 'USD' },
    { key: 'GBP ', text: 'GBP ', value: 'GBP ' },
    { key: 'SGD', text: 'SGD', value: 'SGD' },
]

const InputExampleRightLeftLabeled = () => (
  <Input labelPosition='right' type='text' placeholder='200SEK' action>
    <Label basic>kr</Label>
    <input />
    <Label>.00</Label>
    <Select compact options={options} defaultValue='USD' />
    <Button type='submit'>Convert</Button>
  </Input>
)

export default InputExampleRightLeftLabeled