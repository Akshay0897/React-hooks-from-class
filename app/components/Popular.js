import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function LangaugesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default function Popular() {
  const repoReducer = (state, action) => {
    if (action.type === 'success') {
      return {
        ...state,
        [action.selectedLanguage]: action.payload,
        error: null,
      };
    }
    if (action.type === 'error') {
      return { ...state, error: 'Error occured...' };
    }
  };

  const [selectedLanguage, setselectedLanguage] = useState('All');
  const [state, dispatch] = useReducer(repoReducer, { error: null });

  useEffect(() => {
    if (!state[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          dispatch({ type: 'success', payload: data, selectedLanguage });
        })
        .catch((err) => {
          console.warn('Error fetching repos: ', err);
          dispatch({ type: 'error' });
        });
    }

    return () => {
      console.log('returning uhhh mehhh...');
    };
  }, []);

  const isLoading = () => {
    return !state[selectedLanguage] && state.error === null;
  };

  return (
    <React.Fragment>
      <LangaugesNav
        selected={selectedLanguage}
        onUpdateLanguage={setselectedLanguage}
      />

      {isLoading() && <Loading text="Fetching Repos" />}

      {state.error && <p className="center-text error">{state.error}</p>}

      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  );
}
