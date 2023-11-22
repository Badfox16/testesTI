import React from "react";
import { ROWS, DURATION, TAGS, TAGS_PER_ROW, InfiniteLoopSlider, random, shuffle } from './Slider';
import Tag from './Tag';
import '../style/banner.scss';

export default function Slide() {
    return (
        <div className='app'>
            <banner>
                <h1>Bem vindo ao Testes.TI</h1>
                <p>Aqui podes encontrar testes e exames de diferentes anos e cadeiras</p>
            </banner>
            <div className='tag-list'>
                {[...new Array(ROWS)].map((_, i) => (
                    <InfiniteLoopSlider key={i} duration={random(DURATION - 5000, DURATION + 5000)} reverse={i % 2}>
                        {shuffle(TAGS).slice(0, TAGS_PER_ROW).map(tag => (
                            <Tag text={tag} key={tag} />
                        ))}
                    </InfiniteLoopSlider>
                ))}
                <div className='fade' />
            </div>
        </div>
    )
}