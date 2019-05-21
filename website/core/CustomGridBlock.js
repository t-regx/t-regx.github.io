/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const classNames = require('classnames');

const MarkdownBlock = require('../node_modules/docusaurus/lib/core/MarkdownBlock.js');

class GridBlock extends React.Component {
    renderBlock(origBlock) {
        const blockDefaults = {
            imageAlign: 'left',
        };

        const block = {
            ...blockDefaults,
            ...origBlock,
        };

        const blockClasses = classNames('blockElement', this.props.className, {
            alignCenter: this.props.align === 'center',
            alignRight: this.props.align === 'right',
            fourByGridBlock: this.props.layout === 'fourColumn',
            imageAlignSide:
                (block.image && (block.imageAlign === 'left' || block.imageAlign === 'right')) ||
                (block.video && (block.videoAlign === 'left' || block.videoAlign === 'right')),
            imageAlignTop:
                (block.image && block.imageAlign === 'top') ||
                (block.video && block.videoAlign === 'top'),
            imageAlignRight:
                (block.image && block.imageAlign === 'right') ||
                (block.video && block.videoAlign === 'right'),
            imageAlignBottom:
                (block.image && block.imageAlign === 'bottom') ||
                (block.video && block.videoAlign === 'bottom'),
            imageAlignLeft:
                (block.image && block.imageAlign === 'left') ||
                (block.video && block.videoAlign === 'left'),
            threeByGridBlock: this.props.layout === 'threeColumn',
            twoByGridBlock: this.props.layout === 'twoColumn',
        });

        const topLeftImage =
            (block.imageAlign === 'top' || block.imageAlign === 'left') &&
            this.renderBlockImage(block.image, block.imageLink, block.imageAlt);

        const bottomRightImage =
            (block.imageAlign === 'bottom' || block.imageAlign === 'right') &&
            this.renderBlockImage(block.image, block.imageLink, block.imageAlt);

        const topLeftVideo =
            (block.videoAlign === 'top' || block.videoAlign === 'left') &&
            this.renderBlockVideo(block.video);

        const bottomRightVideo =
            (block.videoAlign === 'bottom' || block.videoAlign === 'right') &&
            this.renderBlockVideo(block.video);

        return (
            <div className={blockClasses} key={block.title}>
                {topLeftVideo}
                {topLeftImage}
                <div className="blockContent">
                    {this.renderBlockTitle(block.title)}
                    <MarkdownBlock>{block.content}</MarkdownBlock>
                </div>
                {bottomRightImage}
                {bottomRightVideo}
            </div>
        );
    }

    renderBlockImage(image, imageLink, imageAlt) {
        if (!image) {
            return null;
        }

        return (
            <div className="blockImage">
                {imageLink ? (
                    <a href={imageLink}>
                        <img src={image} alt={imageAlt}/>
                    </a>
                ) : (
                    <img src={image} alt={imageAlt}/>
                )}
            </div>
        );
    }

    renderBlockVideo(video) {
        if (!video) {
            return null;
        }

        return (
            <div className="blockImage">
                <video src={video} playsInline autoPlay muted loop style={{maxWidth: '100%'}}/>
            </div>
        );
    }

    renderBlockTitle(title) {
        if (!title) {
            return null;
        }

        return (
            <h2>
                <MarkdownBlock>{title}</MarkdownBlock>
            </h2>
        );
    }

    render() {
        return (
            <div className="gridBlock">
                {this.props.contents.map(this.renderBlock, this)}
            </div>
        );
    }
}

GridBlock.defaultProps = {
    align: 'left',
    contents: [],
    layout: 'twoColumn',
};

module.exports = GridBlock;
