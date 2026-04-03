import React from 'react';
import { Paper } from '@material-ui/core';
import './ProjectCardDetails.css';

import { Link } from 'react-router-dom';

const ProjectCardDetails = ({ appData }) => {
  return (
      <Paper elevation={ 2 } >
          
          <Link to={ {
                                      pathname: '/app/' +  appData.id,
                                      state: { appData }
                                    } } style={{textDecoration:'none'}}
          >
              <div className='projectListsContainer'>
                  <div className='projectTitleShorter'>
                      <p className='projectSmallTitle'>{ appData.name !== '' && appData.name.charAt(0).toUpperCase() }</p>
                  </div>
                  <div className='projectTitlesContainer'>
                      <span className='projectTitle'>{ appData.name }</span>
                      <span className='apps'>{appData.plugin && appData.plugin.name}</span>
                  </div>
                  
              </div>
          </Link>
      </Paper>
  )
}

export default ProjectCardDetails