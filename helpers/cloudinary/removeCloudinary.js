const cloudinary = require('../../config/cloudinary')

const extractPublicId = (url) => {
    const parts = url.split('/');
    const fileWithExtension = parts.pop();
    const publicId = parts.slice(parts.indexOf('pojok-shoes')).join('/') + '/' + fileWithExtension.split('.')[0];
    return publicId;
};

const removeCloudinary = async (url, target) => {
    try {
        const validTargets = ['layanan', 'profile'];
        if (!validTargets.includes(target)) {
            throw new Error('Target not found');
        }

        const publicId = extractPublicId(url);

        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error(`Gagal menghapus gambar: ${error.message}`);
    }
};

module.exports = removeCloudinary;