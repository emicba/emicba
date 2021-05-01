import fetch from 'node-fetch';
import yaml from 'js-yaml';
import sample from 'lodash.sample';
import { promises as fs } from 'fs';

const repo = 'https://raw.githubusercontent.com/jmhobbs/cultofthepartyparrot.com/master';

try {
  const response = await fetch(`${repo}/parrots.yaml`);
  if (response.ok) {
    /**
     * @type {{hd: string?, gif: string, name: string}[]}
     */
    const data = yaml.load(await response.text());
    const parrot = sample(data.filter((x) => x.hd));
    await fs.writeFile(
      './README.md',
      `<h2>Today is ${parrot.name}'s day</h2><img src="${repo}/parrots/${parrot.hd}" />`
    );
    process.exit(0);
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
