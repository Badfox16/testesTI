import React from 'react';

const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
const TAGS = ['Álgebra', 'Inglês','FIT', 'ProgramaçãoMóvel', 'FundamentosRedes','PHS',  'PaginasWeb', 'BaseDeDados',
               'ADOO', 'AdministraçãoSistemas', 'TecnologiasInternet','Informatica', 'GestaoTI', 'POO', 'EstruturaDadosAlgoritmo'];
const DURATION = 15000;
const ROWS = 5;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort( () => .5 - Math.random() );

const InfiniteLoopSlider = ({children, duration, reverse = false}) => {
  return (
    <div className='loop-slider' style={{
        '--duration': `${duration}ms`,
        '--direction': reverse ? 'reverse' : 'normal'
      }}>
      <div className='inner'>
        {children}
        {children}
      </div>
    </div>
  );
};

export { random, shuffle, InfiniteLoopSlider, COLORS, TAGS, DURATION, ROWS, TAGS_PER_ROW };