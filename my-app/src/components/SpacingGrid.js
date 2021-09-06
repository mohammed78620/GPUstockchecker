import React, { useState, useEffect } from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';


export default function TitlebarImageList() {
  const [gpus, setGpus] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/gpus/')
    .then(response => {
      setGpus({data: response.data});
      setLoading(false)
      // console.log(response['data'][0][])
    })
    .catch((error) => {
      console.log(error);
      setHasError(true)
      setLoading(false)
    })
  }, [])


  return (
    
    loading ? <div>Loading...</div> : hasError ? <div>Error occured.</div> : 
    // (gpus.data.map( item => 
    <ImageList sx={{ width: 350, height: 350 }} rowHeight={350}>
      {
      gpus.data.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format 1x,
                ${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.stock}
          />
        </ImageListItem>
      ))}
    </ImageList>
    // ))
  
    

  );
};


const itemData = [
  {
    img: 'https://www.scan.co.uk/images/products/xlarge/3273897-xl-a.jpg',
    title: 'ZOTAC NVIDIA GeForce RTX 3060 12GB TWIN EDGE OC Ampere Graphics Card',
    stock: 'out of stock',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://www.scan.co.uk/images/products/super/3330996-l-a.jpg',
    title: 'ASUS NVIDIA GeForce RTX 3070 Ti 8GB TUF GAMING OC Ampere Graphics Card',
    stock: 'out of stock'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },

];