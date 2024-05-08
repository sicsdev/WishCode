import React from "react";
import { imageBaseUrl } from "../../base_url/config";
import { stripHtml } from "../../helper/Helper";

const HomeFeatures = (props) => {
  return (
    <section className="features_wrapper section-gap">
      <div className="container">
        <div className="section-title">
          <h3>Features</h3>
        </div>

        <div className="features_content_iinner ">
          <div className="row">
            {props.featureList?.map((feature, key) => (
              <div className="col-md-3" key={key}>
                <div className="card-wrapper">
                  <img
                    className="card-img-top pt-2"
                    src={
                      feature.image
                        ? `${imageBaseUrl}/${feature.image}`
                        : `${imageBaseUrl}/images/feature-image.png`
                    }
                    alt="Card cap"
                  />
                  <div className="card-body-content">
                    <h5>{feature.title}</h5>
                    <p>{stripHtml(feature.content)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
