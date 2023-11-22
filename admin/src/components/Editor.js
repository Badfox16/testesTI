import React from "react";
import ReactQuill, { Quill } from 'react-quill';

export default function Editor({value,onChange}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      [
        {
          align: '',
        },
        {
          align: 'center',
        },
        {
          align: 'right',
        },
        {
          align: 'justify',
        },
      ],
      [{ 'image': 'Upload Image' }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
  ]

  return (
    <div className="content">
    <ReactQuill
      value={value}
      theme="snow"
      modules={modules}
      formats={formats}
      onChange={onChange}
       />
    </div>
  );
}