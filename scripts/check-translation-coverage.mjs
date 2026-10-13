import fs from 'node:fs/promises';
import ts from 'typescript';
const catalogue={...JSON.parse(await fs.readFile('src/content/translations.json','utf8')),...JSON.parse(await fs.readFile('src/content/programme-translations.json','utf8')),...JSON.parse(await fs.readFile('src/content/additional-translations.json','utf8'))};
const keys=new Set();
for(const file of ['src/App.tsx','src/components/UI.tsx',...(await fs.readdir('src/features')).filter(file=>file.endsWith('.tsx')).map(file=>`src/features/${file}`)]){
 const source=ts.createSourceFile(file,await fs.readFile(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const collect=node=>{if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)){keys.add(node.text.trim().replace(/\s+/g,' '));}if(ts.isConditionalExpression(node)){collect(node.whenTrue);collect(node.whenFalse);}};
 const visit=node=>{if(ts.isCallExpression(node)&&node.expression.getText(source)==='t')node.arguments.forEach(collect);ts.forEachChild(node,visit);};visit(source);
}
const preserved=['English','National Centre for Financial Education','E-LMS','F','हिन्दी · Hindi','ଓଡ଼ିଆ · Odia'];
const missing=[...keys].filter(key=>/[A-Za-z]/.test(key)&&!catalogue[key]&&!preserved.includes(key));
if(missing.length){console.error(JSON.stringify(missing,null,2));process.exitCode=1;}else{console.log('All static interface strings have draft translations or preserved names.');}
