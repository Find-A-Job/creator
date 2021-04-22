1.声明`uniform`类型需要在末尾加分号<br>
```
#if USE_OLD_PHOTO
  uniform OldPhoto {
    // 老化程度
    float oldLevel;
  };
#endif
```
2.声明定义函数
```
vec4 f1(vec2 a1, float a2){
  return vec4(1.0);
}

// 如果b<a返回0，否则返回1
step(a, b);
// a<c<b,c<a返回0,c>b返回1,否则返回0~1之间,若a>b返回undefined
smoothstep(a, b, c);
```
