import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';

function scrollContainer(id, { isNegative } = {}) {
  return () => {
    const scrollableContainer = document.getElementById(id);
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

const openBlock = (data) => {
  const randomPosition = Math.floor(data.length * Math.random());
  const itemSelected = data[randomPosition];
  window.open(itemSelected.external_urls.spotify);
}
export default function DiscoverBlock({ text, id, data, imagesKey = 'images', loading = false, error = false }) {
  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data && data.length && !loading ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      {loading && !error && <div className="discover-block__loader">Loading</div>}
      {error && <div className="discover-block__error"> There was an error loading <span className="error-description">{text}</span>, please try again later</div>}
      {data && <div className="discover-block__row" id={id} onClick={() => openBlock(data)}>
        {data.map(({ [imagesKey]: images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>}
    </div>
  );
}
