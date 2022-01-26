const flat = (list, join, val) =>{

  let _flattened = [],
      joints = {
        empty:      '',
        space:      ' ',
        tab:        '  ',
        break:      '\n',
        comma:      ',',
        line:       '-',
        dot:        '.',
        ddot:       ':',
        dddot:      '::',
        slash:      '/',
        backslash:  '\\',
        pipe:       '|',
        equal:      '=',
      },
      joint = joints.empty

  if (join) join.split(':').forEach(item=> { joint = joint + joints[item] }) 
  else joint = joints.break

  if (Array.isArray(list)) 
    list.forEach((item) => {
      _flattened.push(`${item}`)
    })
  else 
    Object.keys(list).forEach((key) => { 
      if (!val) _flattened.push(`${key}`) 
      else      _flattened.push(`${key}: '${list[key]}'`) 
    })
  
  return _flattened.join(joint)
}

module.exports = flat