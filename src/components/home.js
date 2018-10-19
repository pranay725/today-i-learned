import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import getClient from '../lib/get-contentful-client.js';
import { storeState } from '../lib/store-state.js';

import { Card, CardHeader } from './card.js';
import { Spinner } from './loading.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = props.initialState || {
      error: null,
      isLoaded: false,
      items: []
    };

    // needed for react-snap
    window.snapSaveState = () => {
      storeState(this.state);
    };
  }

  componentDidMount() {
    this.state.isLoaded ||
      getClient(process.env)
        .getEntries({
          content_type: 'post'
        })
        .then(({ items }) => {
          this.setState({
            categories: this.getCategories(items),
            isLoaded: true
          });
        })
        .catch(error => {
          this.setState({
            error,
            isLoaded: true
          });
        });
  }

  getCategories(items) {
    return items.reduce((acc, item) => {
      const category = item.fields.category;
      const categorySlug = category.fields.slug;
      if (!acc[categorySlug]) {
        acc[categorySlug] = { category, posts: [] };
      }

      acc[categorySlug].posts.push(item);
      return acc;
    }, {});
  }

  render() {
    const { error, categories, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Spinner />;
    } else {
      return (
        <div>
          <Helmet>
            <title>BioTrack | Companies and Products</title>
          </Helmet>
          <h1 className="centered"></h1>

          

          
          <ul className="o-grid">
            {Object.entries(categories).map(
              ([categorySlug, { category, posts }]) => (
                <li key={categorySlug}>
                  <Card>
                    <CardHeader className={`o-gradient-${categorySlug}`}>
                      {category.fields.title}
                      <img
                        aria-hidden="true"
                        src={category.fields.icon.fields.file.url}
                        alt=""
                      />
                    </CardHeader>
                    <ul>
                      {posts.map(({ sys, fields }) => (
                        <li key={sys.id}>
                          <Link to={`/posts/${fields.slug}/`}>
                            {fields.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <br />
                  </Card>
                </li>
              )
            )}
          </ul>
        </div>
      );
    }
  }
}

export default Home;
