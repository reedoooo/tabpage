// EditTabFormsModal.js
import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const EditTabFormsModal = ({ initialValues, onSubmit, onClose, onDelete }) => {
  const [name, setName] = useState(initialValues.name);
  const [size, setSize] = useState(initialValues.size);
  const [color, setColor] = useState(initialValues.color);
  const [linkUrl, setLinkUrl] = useState(initialValues.linkUrl);
  const [imgUrl, setImgUrl] = useState(initialValues.imgUrl);
  console.log(initialValues)

  let deleteId = initialValues.id;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let id = initialValues.id;
    console.log(id)

    onSubmit({ id, name, size, color, linkUrl, imgUrl });
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    let id = deleteId;
    console.log(id)
    onDelete({ id, name, size, color, linkUrl, imgUrl });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Size</FormLabel>
        <Select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="large">Large</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Color</FormLabel>
        <Select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Link URL</FormLabel>
        <Input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input type="url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
      </FormControl>

      <Button type="submit" colorScheme="green" mt={4}>Save Changes</Button>
      <Button onClick={handleFormDelete} colorScheme="red" mt={4}>Delete</Button>
      <Button onClick={onClose} colorScheme="gray" mt={4}>Cancel</Button>
      {/* <Button onClick={onClose}>Cancel</Button> */}
      {/* <Button onClick={handleDelete} colorScheme="red" mt={4}>Delete Todo Item</Button> */}
    </form>
  );
};

export default EditTabFormsModal;
