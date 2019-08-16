import { exec } from './exec';

exec(
  `
  cp .env.production .env.production.backup
  cat .env.production-ii-uwr >> .env.production
`,
  { dir: './packages/client' }
);

exec('yarn build-client --public-url ./');

exec(
  `
  mv .env.production.backup .env.production
`,
  { dir: './packages/client' }
);

exec(`
  ssh anumuser@rno.ii.uni.wroc.pl rm -rf ~/www-lagrange/*
  scp -r dist/client/* anumuser@rno.ii.uni.wroc.pl:~/www-lagrange
`);