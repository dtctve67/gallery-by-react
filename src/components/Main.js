require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDataArr) {
  for (var i = 0; i < imageDataArr.length; i++) {
    var singleImageData = imageDataArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.filename);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageDatas);

var GalleryByReactApp = React.createClass({

  render: function () {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
});


GalleryByReactApp.defaultProps = {};
export default GalleryByReactApp;
