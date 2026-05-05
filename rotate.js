import { Jimp } from "jimp";

async function rotateImage() {
  try {
    const image = await Jimp.read("public/download.png");
    // The user says "rotate it to make it look better". Usually this means it's 90 degrees off. Let's rotate it by 90 degrees clockwise.
    image.rotate(90);
    await image.write("public/download.png");
    console.log("Image rotated successfully");
  } catch (err) {
    console.error("Error rotating image:", err);
  }
}

rotateImage();
