import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import banner from '../assets/Images/banner.png';
import million from '../assets/Images/million.png';
import sharkTank from '../assets/Images/Shark_Tank.png';
import disney from '../assets/Images/disney.png';
import divya from '../assets/Images/Divya-Bhaskar.png';
import gujarati from '../assets/Images/Tv9-gujarati-logo 1.png';
import dainik from '../assets/Images/dainik-bhaskar-logo 1.png';
import et from '../assets/Images/et-logo4px 1.png';
import ndtv from '../assets/Images/ndtv.png';
import hindustantimes from '../assets/Images/hindustantimes.png';
import indiaTime from '../assets/Images/indiaTime.png';
import news18 from '../assets/Images/news18.png';
import sellerRIng from '../assets/Images/SELLER.png';
import hero from '../assets/Images/freebies_monsoon.png';
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <Hero />
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <RecommendedProducts products={data.recommendedProducts} />

      <BestSeller />
      <DiscountCoupons />
      {/* <ProductCards /> */}
      <Partners />

      <div className="bannerads">
        <img src={banner} className="bannerImages" alt="bannerImage" />
      </div>
    </div>
  );
}

// banner section
function Hero() {
  return (
    <div>
      <img src={hero} className="heroImage" alt="" />
    </div>
  );
}

// product cards section
// function ProductCards() {
//   return (
//     <div className="productCards">
//       <div className="container">
//         <div className="commonHeader">
//           <h2>Best Sellers</h2>
//           <button>
//             View All <img src={dropdown} alt="img" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// mobile best seller
function BestSeller() {
  return (
    <div className="happyCustomer tabView">
      <div className="container">
        <div className="partnerWrapper">
          <div className="sellerBox">
            <img src={sellerRIng} alt="sharkTank" />
            <h3>BestSellers</h3>
          </div>
          <div className="sellerBox">
            <img src={sellerRIng} alt="sharkTank" />
            <h3>Hair Care</h3>
          </div>
          <div className="sellerBox">
            <img src={sellerRIng} alt="sharkTank" />
            <h3>Skin Care</h3>
          </div>
          <div className="sellerBox">
            <img src={sellerRIng} alt="sharkTank" />
            <h3>Health</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
function DiscountCoupons() {
  return (
    <div className="happyCustomer tabView">
      <div className="container">
        <div className="partnerWrapper couponBoxWrapper">
          <div className="couponBox">
            <h3>Unlock Exclusive Discount</h3>
            <button>DOWNLOAD APP</button>
          </div>
          <div className="couponBox">
            <h3>tackle hair struggles together</h3>
            <button>DOWNLOAD APP</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Partners() {
  return (
    <div className="happyCustomer">
      <div className="container">
        <div className="commonHeading">
          <div className="imageHeading">
            <img src={million} alt="million" />
            <div>
              <h2>1M+ Happy Customers</h2>
              <span>82%* saw results in 6 months</span>
            </div>
          </div>
          <p>*As per monthly poll conducted on instagram</p>
        </div>
        <div className="partnerWrapper">
          <div className="partnerImg ">
            <img src={sharkTank} alt="sharkTank" className="px-2" />
          </div>
          <div className="partnerImg">
            <img src={disney} alt="sharkTank" />
          </div>

          <div className="partnerImg">
            <img src={divya} alt="sharkTank" />
          </div>
          <div className="partnerImg">
            <img src={gujarati} alt="sharkTank" />
          </div>
          <div className="partnerImg">
            <img src={dainik} alt="sharkTank" />
          </div>
          <div className="partnerImg p-0">
            <img src={indiaTime} alt="sharkTank" />
          </div>

          <div className="partnerImg">
            <img src={news18} alt="sharkTank" />
          </div>
          <div className="partnerImg">
            <img src={hindustantimes} alt="sharkTank" />
          </div>
          <div className="partnerImg">
            <img src={ndtv} alt="sharkTank" />
          </div>
          <div className="partnerImg">
            <img src={et} alt="sharkTank" className="px-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products container">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid relative">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product relative"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <span>Best Seller</span>
                      <div className="">
                        <h4>{product.title}</h4>
                        <small>
                          <Money data={product.priceRange.minVariantPrice} />
                        </small>
                      </div>
                      <button> ADD TO CART</button>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
