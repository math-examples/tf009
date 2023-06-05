/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 16:32:52
 * @Description: 图片加载
 */

const IMAGE_SIZE = 224;
const prefix = './brand';
const loadImg = (src) => {
    return new Promise(resolve => {
        const img = new Image();
        // 允许跨域
        img.crossOrigin = "anonymous";
        img.src = src;
        img.width = IMAGE_SIZE;
        img.height = IMAGE_SIZE;
        img.onload = () => resolve(img);
    });
};
export const getTestInputs = async () => {
    const loadImgs = []; // img - promise
    const labels = [];
   let srcs = [
   `${prefix}/test/apple8.0.jpeg`,
   `${prefix}/test/apple-reverse.jpg`,
   `${prefix}/test/windows.png`,
   `${prefix}/test/android.jpg`,
    ];
    
    for (let i = 0; i < srcs.length; ++i) {
        const img = loadImg(srcs[i]);
            loadImgs.push(img);
    }
    return await Promise.all(loadImgs);
}

export const getInputs = async () => {
    const loadImgs = []; // img - promise
    const labels = [];
    for (let i = 0; i < 30; i += 1) {
        ['android', 'apple', 'windows'].forEach(label => {
            const src = `${prefix}/train/${label}-${i}.jpg`;
            const img = loadImg(src);
            loadImgs.push(img);
            labels.push([
                label === 'android' ? 1 : 0,
                label === 'apple' ? 1 : 0,
                label === 'windows' ? 1 : 0,
            ]);
        });
    }
    const inputs = await Promise.all(loadImgs);
    return {
        inputs,
        labels,
    };
}
