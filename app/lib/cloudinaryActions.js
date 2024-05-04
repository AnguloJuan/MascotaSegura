export default async function postImage(body, image) {
    //subir imagen a cloudinary
    body.set('file', image);
    body.set('upload_preset', 'mascotaSegura');

    const data = await fetch(
        'https://api.cloudinary.com/v1_1/dyvwujin9/image/upload',
        {
            method: 'POST',
            body,
        }
    ).then((r) => r.json());

    body.set('image', data.secure_url);
}