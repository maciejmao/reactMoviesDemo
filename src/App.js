import React, { useState } from 'react';
import './App.scss';
import Movies from './components/Movies';

function App() {

  const [phrase, setPhrase] = useState('');
  const searchInput = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    let searchInputVal = searchInput.current.value.replace(/\s*/gi, '');
    if (!searchInputVal) {
      return;
    }
    setPhrase(searchInputVal);
  }

  let result;
  if (phrase) {
    if (phrase.length > 2)
    result = <Movies searching={phrase} />;
    else
    result = <div className="notification is-warning">You need to enter at least <strong>3</strong> chars</div>;
  }

  return (
    <div className="App">
        <section id="searchForm" className="section">
          <div className="container is-fluid">
            <h1 className="subtitle">MOVIES SEARCH APP</h1>
            <form onSubmit={handleSubmit}>
              <label className="label" htmlFor="mvname">
                Find movies from IMDB base (max 10 results from this api)
              </label>
              <div className="field has-addons has-addons-centered">
                <div className="control">
                  <input id="mvname" className="input" type="text" placeholder="enter phrase here" ref={searchInput} />
                </div>
                <div className="control">
                  <button className="button is-info">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        <section className="section">
          <div className="container is-fluid">
            {result}
          </div>
        </section>
    </div>
  );
}

export default App;
