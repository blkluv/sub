import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  config,
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { getType, iconMapper } from './mimeTools'
import Pagination from '../Dashboard/Pagination'
config.autoAddCss = false

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

export default function Gallery({ fullResponse, name, handleChangePage }) {
  const [items, setItems] = useState([]);

  const mainThree = ["image", "audio", "video"];
  useEffect(() => {
    if(fullResponse && fullResponse.childContent) {
      setItems(fullResponse.childContent);
    }
  }, [fullResponse]);

  const getIcon = (name) => {
    const type = getType(name.split(".")[1]);
    let icon = null;
    if(mainThree.includes(type.split("/")[0])) {
      icon = iconMapper(type.split("/")[0]);
    } else {
      icon = iconMapper(type);
    }
    return icon;
  }
  const getName = (name) => {
    const items = name.split("/");
    return items[items.length - 1];
  }
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-2">
        <h2 className="text-xl font-sans font-bold sm:my-4 my-6">{name}</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {items.map((item) => (
            <a target="_blank" rel="noopener noreferrer" key={item.id} href={`${fullResponse.gateway}${item.uri}?accessToken=${fullResponse.token}`} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">             
              <FontAwesomeIcon icon={getIcon(getName(item.originalname))} style={{ fontSize: 75, padding: 10 }} />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{getName(item.originalname)}</h3>
              {/* <p className="mt-1 text-lg font-medium text-gray-900">{item.cid}</p> */}
            </a>
          ))}          
        </div>
      </div>
      {
            fullResponse.totalItems > items.length &&
            <div>
              <Pagination handlePageChange={handleChangePage} />
            </div>
          }
    </div>
  )
}