import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'assets');

const renames = [
    { old: 'Music1.Mp3.mp3', new: 'music1.mp3' },
    { old: 'Music 2.mp3', new: 'music2.mp3' },
    { old: 'Pink sand.jpeg', new: 'pink_sand.jpeg' },
    { old: 'bali swing.jpeg', new: 'bali_swing.jpeg' }
];

renames.forEach(({ old, new: newName }) => {
    const oldPath = path.join(assetsDir, old);
    const newPath = path.join(assetsDir, newName);

    if (fs.existsSync(oldPath)) {
        try {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${old} -> ${newName}`);
        } catch (e) {
            console.error(`Failed to rename ${old}:`, e.message);
        }
    } else {
        console.log(`Skipping ${old} (not found)`);
    }
});
