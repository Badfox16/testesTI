import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

const DisqusComments = ({ id, titulo }) => {
    const disqusShortname = "testes-ti"

    const disqusConfig = {
        url: "http://localhost",
        identifier: id,
        title: titulo,
        language: 'pt'
    }
    
    return (
        <DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
        />
    )
}

export default DisqusComments