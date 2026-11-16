/* Training data for the merged habits + training page. */
(function () {
    const ICONS = {
      chest: '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M14 26c7-5 13-7 18-7s11 2 18 7M18 37c5-4 9-6 14-6s9 2 14 6M21 48c4-6 7-9 11-9s7 3 11 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="32" cy="13" r="5" stroke="currentColor" stroke-width="2.2"/></svg>',
      back: '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 11v42M18 20c4 3 8 5 14 5s10-2 14-5M15 31c5 3 10 4 17 4s12-1 17-4M18 45c4-2 8-3 14-3s10 1 14 3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
      legs: '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M24 11v15l-7 14 6 13M40 11v15l7 14-6 13M17 29h30" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="10" r="4.5" stroke="currentColor" stroke-width="2.2"/></svg>',
      shoulders: '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="16" r="5" stroke="currentColor" stroke-width="2.2"/><path d="M15 28c5-4 10-6 17-6s12 2 17 6M20 30l-9 8M44 30l9 8M23 41v13M41 41v13M23 54h-7M41 54h7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
      arms: '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M19 14v16c0 6 4 10 10 10h7c7 0 12 4 12 10M17 20h16M12 24h10M50 46h8M31 16v8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
      core: '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="20" y="15" width="24" height="34" rx="8" stroke="currentColor" stroke-width="2.2"/><path d="M25 25h14M25 32h14M25 39h14M32 22v22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      warmup: '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M11 34c7-10 14-10 21 0s14 10 21 0M11 45c7-7 14-7 21 0s14 7 21 0M16 18c4-4 8-4 12 0M36 18c4-4 8-4 12 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>'
    };

    const TRAINING_PLANS = [
      {
        code: 'DAY 1', name: '胸 + 三头', focus: '胸部与肱三头肌', totalSets: 23, duration: '约 45 分钟',
        summary: '先活动肩袖与胸椎，再完成推、夹胸和三头肌训练。',
        warmups: [
          { name: '胸大肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '侧卧在泡沫轴上缓慢滚动胸大肌，遇到紧张点停留呼吸，不直接压肩关节。' },
          { name: '肱三头肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '侧卧或仰卧，将泡沫轴放在上臂后侧缓慢滚动，保持手臂放松。' },
          { name: '弹力带水平拉开', dose: '10–15 次 · 1 组', cue: '肩膀下沉，手臂在胸前水平打开，感受上背收紧。' },
          { name: '弹力带前后绕环', dose: '8–12 次 · 1 组', cue: '使用轻阻力弹力带，完整画圆，避免耸肩和腰部代偿。' },
          { name: '俯卧 Y 字抬臂', dose: '8–12 次 · 1 组', cue: '额头轻贴地面，手臂形成 Y 字抬起，重点是肩胛骨下沉后缩。' },
          { name: '拉锯式平板支撑', dose: '4–6 次完整往返 · 1 组', cue: '保持骨盆稳定，前后移动时不要让腰部塌陷。' }
        ],
        exercises: [
          { name: '哑铃支撑深幅俯卧撑', group: '胸部', icon: 'chest', sets: 4, reps: '10–15 次', rest: 90, cue: '双手支撑哑铃，收紧核心和臀部。肘部约 45° 下放，胸口尽量接近地面，再稳定推起。' },
          { name: '地面哑铃卧推', group: '胸部', icon: 'chest', sets: 4, reps: '10–15 次', rest: 90, cue: '仰卧屈膝，哑铃位于胸部两侧。上臂轻触地面后暂停，再向上推起，避免腰部过度反弓。' },
          { name: '双杠臂屈伸', group: '胸部', icon: 'chest', sets: 4, reps: '10–12 次', rest: 90, cue: '肩膀保持下沉，身体略前倾。控制下放深度，避免耸肩或借力摆动。' },
          { name: '地面哑铃飞鸟', group: '胸部', icon: 'chest', sets: 4, reps: '12–15 次', rest: 90, cue: '手肘保持微屈，以拥抱弧线打开和合拢哑铃。不要把它做成卧推。' },
          { name: '站姿哑铃过顶臂屈伸', group: '上臂', icon: 'arms', sets: 4, reps: '10–12 次', rest: 90, cue: '双手托住一只哑铃举过头顶，手肘靠近耳朵。保持肋骨下沉，只移动前臂。' },
          { name: '俯身单臂哑铃臂屈伸', group: '上臂', icon: 'arms', sets: 3, reps: '12 次/侧', rest: 90, unilateral: true, cue: '躯干保持稳定，上臂贴近身体侧面。伸直手臂后缓慢回放，左右两侧都完成再算一组。' }
        ]
      },
      {
        code: 'DAY 2', name: '背 + 二头', focus: '背部与肱二头肌', totalSets: 22, duration: '约 42 分钟',
        summary: '以水平拉和垂直拉建立背部发力，再补充二头肌弯举。',
        warmups: [
          { name: '中上背滚动', dose: '总计 30–60 秒 · 1 组', cue: '泡沫轴放在上背，双手抱头保持胸廓打开，缓慢上下滚动。' },
          { name: '肱二头肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '将上臂前侧放在泡沫轴上，轻柔滚动，避开肘窝。' },
          { name: '弹力带水平拉开', dose: '10–15 次 · 1 组', cue: '双手水平拉开弹力带，肩胛骨向后靠拢，颈部保持放松。' },
          { name: '弹力带前后绕环', dose: '8–12 次 · 1 组', cue: '小幅度、慢速度完成前后绕环，始终保持肩膀下沉。' },
          { name: '俯卧 Y 字抬臂', dose: '8–12 次 · 1 组', cue: '手臂斜向抬起形成 Y 字，动作来自肩胛骨控制，不要抬头。' },
          { name: '凳上跪姿肘屈伸', dose: '6–10 次 · 1 组', cue: '双手撑凳，身体前移让肩肘充分伸展，再用上背和肩部推回。' }
        ],
        exercises: [
          { name: '跪姿健腹轮前推', group: '腰腹', icon: 'core', sets: 4, reps: '12 次', rest: 90, cue: '骨盆轻微后倾，收紧腹部。向前推时保持腰背稳定，不要塌腰。' },
          { name: '单臂哑铃俯身划船', group: '背部', icon: 'back', sets: 4, reps: '10–15 次/侧', rest: 90, unilateral: true, cue: '一只手支撑凳面，另一只手将哑铃拉向髋部。躯干不要旋转，左右两侧都完成后确认一组。' },
          { name: '引体向上', group: '背部', icon: 'back', sets: 4, reps: '10–12 次', rest: 90, cue: '先下沉肩胛骨再拉起身体，胸口朝杠，控制下放。必要时使用弹力带辅助。' },
          { name: '双臂哑铃俯身划船', group: '背部', icon: 'back', sets: 4, reps: '10–12 次', rest: 90, cue: '髋部后移保持俯身，双手拉向腹部，顶端停顿，避免用腰部甩动。' },
          { name: '哑铃交替弯举', group: '上臂', icon: 'arms', sets: 3, reps: '10 次/侧', rest: 90, unilateral: true, cue: '手肘固定在身体两侧，交替弯举并控制下放，不要借助身体摆动。' },
          { name: '哑铃锤式弯举', group: '上臂', icon: 'arms', sets: 3, reps: '10–12 次/侧', rest: 90, unilateral: true, cue: '采用中立握法，手肘靠近身体。顶端短暂停顿，下放时保持张力。' }
        ]
      },
      {
        code: 'DAY 3', name: '大腿 + 小腿', focus: '臀腿与小腿', totalSets: 21, duration: '约 45 分钟',
        summary: '先打开髋部和踝关节，再完成单腿稳定、深蹲与后链训练。',
        warmups: [
          { name: '臀部滚动', dose: '每侧 30–60 秒 · 1 组', cue: '坐在泡沫轴上，一侧脚踝搭在对侧膝上，缓慢滚动臀部外侧。' },
          { name: '小腿后侧滚动', dose: '每侧 30–60 秒 · 1 组', cue: '小腿放在泡沫轴上，脚踝缓慢转动，避开膝关节后侧。' },
          { name: '弓步转体', dose: '每侧 3–5 次 · 1 组', cue: '进入弓步后保持骨盆稳定，胸椎向一侧旋转，再回正换边。' },
          { name: '弓步后移拉伸', dose: '每侧 10–20 秒 · 1 组', cue: '后膝落地，髋部缓慢向前，感受后侧髋屈肌拉伸，不要塌腰。' },
          { name: '青蛙趴前后移动', dose: '6–10 次完整往返 · 1 组', cue: '膝盖分开、脚尖朝外，骨盆小幅度前后移动，以髋内侧拉伸为主。' }
        ],
        exercises: [
          { name: '哥本哈根侧平板髋内收', group: '大腿', icon: 'legs', sets: 3, reps: '1 分钟', rest: 90, timed: true, cue: '侧平板支撑，上方腿放在椅子或凳上，下方腿内收。每侧 30 秒，两侧合计 1 分钟。' },
          { name: '单腿臀桥（对侧伸腿）', group: '大腿', icon: 'legs', sets: 3, reps: '12–15 次/侧', rest: 90, unilateral: true, cue: '一脚踩地，对侧腿伸直。用脚跟发力抬起髋部，保持骨盆水平。' },
          { name: '哑铃后撤弓步（单侧示范）', group: '大腿', icon: 'legs', sets: 4, reps: '8–10 次/侧', rest: 90, unilateral: true, cue: '向后退一步下蹲，前脚掌稳定，前膝沿着脚尖方向移动。' },
          { name: '哑铃高脚杯深蹲', group: '大腿', icon: 'legs', sets: 4, reps: '12–15 次', rest: 90, cue: '哑铃贴近胸前，膝盖向脚尖方向打开。保持胸口抬起，稳定下蹲。' },
          { name: '哑铃直腿硬拉', group: '大腿', icon: 'legs', sets: 4, reps: '10–12 次', rest: 90, cue: '髋部向后移动，膝盖微屈，背部保持中立。感受大腿后侧拉伸后收紧臀部站起。' },
          { name: '站姿提踵（踏板）', group: '小腿', icon: 'legs', sets: 3, reps: '15–18 次', rest: 90, cue: '前脚掌踩在踏板上，脚跟充分下沉后踮起。顶端停顿，缓慢下放。' }
        ]
      },
      {
        code: 'DAY 4', name: '肩 + 手臂', focus: '肩部与上臂', totalSets: 24, duration: '约 42 分钟',
        summary: '围绕三角肌前中后束展开，最后用弯举和臂屈伸收尾。',
        warmups: [
          { name: '中上背滚动', dose: '总计 30–60 秒 · 1 组', cue: '泡沫轴放在上背，双手抱头，胸廓打开，缓慢滚动。' },
          { name: '肱三头肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '上臂后侧放在泡沫轴上缓慢滚动，保持肩部放松。' },
          { name: '弹力带水平拉开', dose: '10–15 次 · 1 组', cue: '肩膀下沉，双手水平拉开，末端感受上背收紧。' },
          { name: '弹力带前后绕环', dose: '8–12 次 · 1 组', cue: '完整画圆，保持核心稳定，避免腰部跟着晃动。' },
          { name: '凳上跪姿肘屈伸', dose: '6–10 次 · 1 组', cue: '双手撑凳，身体前移让肩肘伸展，再通过肩胛骨和上背推回。' },
          { name: '俯卧 Y 字抬臂', dose: '8–12 次 · 1 组', cue: '俯卧，手臂形成 Y 字抬起，保持颈部中立和肩胛骨下沉。' }
        ],
        exercises: [
          { name: '哑铃俯身反向飞鸟', group: '肩部', icon: 'shoulders', sets: 4, reps: '12–15 次', rest: 90, cue: '俯身保持背部平直，手肘微屈，以肘部带动向两侧打开，重点刺激三角肌后束。' },
          { name: '坐姿哑铃肩上推举', group: '肩部', icon: 'shoulders', sets: 4, reps: '10–12 次', rest: 90, cue: '手腕叠在肘部上方，肋骨保持下沉。向上推起哑铃，不要用腰部顶起。' },
          { name: '哑铃前平举', group: '肩部', icon: 'shoulders', sets: 4, reps: '10–12 次', rest: 90, cue: '手肘微屈，将哑铃抬到肩高即可，避免耸肩和身体后仰。' },
          { name: '哑铃侧平举', group: '肩部', icon: 'shoulders', sets: 4, reps: '10–12 次', rest: 90, cue: '以手肘带动向两侧抬起，肩膀保持下沉，控制下放速度。' },
          { name: '哑铃交替弯举', group: '上臂', icon: 'arms', sets: 4, reps: '8–10 次/侧', rest: 90, unilateral: true, cue: '手肘固定在身体两侧，交替弯举，避免借力和身体摆动。' },
          { name: '坐姿哑铃过顶臂屈伸（靠背支撑）', group: '上臂', icon: 'arms', sets: 4, reps: '12 次', rest: 90, cue: '背部靠稳椅背，双手托住哑铃举过头顶。保持手肘朝前，只屈伸前臂。' }
        ]
      }
    ];
  const TRAINING_LIBRARY = [
    { id: 'home-four-split', name: '居家四分化', parts: '胸 · 背 · 腿 · 肩臂', type: '居家系列', author: '谭成义', days: '4 天', available: true },
    { id: 'four-split-training', name: '四分化训练', parts: '胸 · 背 · 臀腿 · 肩臂', type: '进阶', author: '谭成义 · 焚决', days: '4 天', available: true },
    { name: '三分化', parts: '胸 · 背 · 腿', type: '基础', author: '谭成义 & 凯圣王', days: '3 天' },
    { name: '焚决 · 三分化', parts: '推 · 拉 · 腿', type: '高强度', author: '加强版 · 新手勿练', days: '3 天' },
    { name: '增肌减脂', parts: '有氧与全身训练', type: '塑形', author: '塑形系列', days: '3 天' },
    { name: '私教五分化训练', parts: '胸 · 背 · 肩 · 手臂 · 腿', type: '私教', author: '谭成义', days: '5 天' },
    { name: '女生四分化', parts: '美背 · 肩 · 臀腿 · 核心', type: '女生计划', author: '健身房版', days: '4 天' },
    { name: '女生居家五分化', parts: '胸肩 · 背 · 臀腿 · 手臂 · 核心', type: '女生计划', author: '居家版', days: '5 天' }
  ];
  const FOUR_SPLIT_TRAINING_PLANS = [
    {
      code: 'DAY 1',
      name: '胸 + 三头',
      focus: '胸部与肱三头肌',
      totalSets: 17,
      duration: '',
      summary: '胸 + 三头训练日。',
      warmups: [
        { name: '胸大肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '侧卧在泡沫轴上缓慢滚动胸大肌，遇到紧张点停留呼吸，不直接压肩关节。' },
        { name: '肱三头肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '侧卧或仰卧，将泡沫轴放在上臂后侧缓慢滚动，保持手臂放松。' },
        { name: '弹力带水平拉开', dose: '10–15 次 · 1 组', cue: '肩膀下沉，手臂在胸前水平打开，感受上背收紧。' },
        { name: '弹力带前后绕环', dose: '8–12 次 · 1 组', cue: '使用轻阻力弹力带，完整画圆，避免耸肩和腰部代偿。' },
        { name: '俯卧 Y 字抬臂', dose: '8–12 次 · 1 组', cue: '额头轻贴地面，手臂形成 Y 字抬起，重点是肩胛骨下沉后缩。' },
        { name: '拉锯式平板支撑', dose: '4–6 次完整往返 · 1 组', cue: '保持骨盆稳定，前后移动时不要让腰部塌陷。' }
      ],
      exercises: [
        { name: '站姿绳索夹胸', group: '胸部', icon: 'chest', sets: 3, reps: '12 次', rest: 90, cue: '按计划完成，保持躯干稳定，控制夹胸和回放过程。' },
        { name: '杠铃卧推', group: '胸部', icon: 'chest', sets: 5, reps: '10 次', rest: 90, cue: '按计划完成，保持肩胛稳定，控制杠铃下放与推起。' },
        { name: '器械上斜推胸', group: '胸部', icon: 'chest', sets: 3, reps: '10–12 次', rest: 90, cue: '按计划完成，保持背部贴靠支撑，控制推举轨迹。' },
        { name: '站姿杠铃宽握推举', group: '肩部', icon: 'shoulders', sets: 3, reps: '10–12 次', rest: 90, cue: '按计划完成，收紧核心，避免腰部过度反弓。' },
        { name: '绳索过顶臂屈伸（绳把）', group: '上臂', icon: 'arms', sets: 3, reps: '10 次', rest: 90, cue: '按计划完成，保持上臂稳定，只屈伸前臂。' }
      ]
    }
  ];

  FOUR_SPLIT_TRAINING_PLANS.push(
    {
      code: 'DAY 2',
      name: '背 + 二头',
      focus: '背部与肱二头肌',
      totalSets: 24,
      duration: '',
      summary: '背 + 二头训练日。',
      warmups: [
        { name: '中上背滚动', dose: '总计 30–60 秒 · 1 组', cue: '泡沫轴放在上背，双手抱头保持胸廓打开，缓慢上下滚动。' },
        { name: '肱二头肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '将上臂前侧放在泡沫轴上，轻柔滚动，避开肘窝。' },
        { name: '弹力带水平拉开', dose: '10–15 次 · 1 组', cue: '双手水平拉开弹力带，肩胛骨向后靠拢，颈部保持放松。' },
        { name: '弹力带前后绕环', dose: '8–12 次 · 1 组', cue: '小幅度、慢速度完成前后绕环，始终保持肩膀下沉。' },
        { name: '俯卧 Y 字抬臂', dose: '8–12 次 · 1 组', cue: '手臂斜向抬起形成 Y 字，动作来自肩胛骨控制，不要抬头。' },
        { name: '凳上跪姿肘屈伸', dose: '6–10 次 · 1 组', cue: '双手撑凳，身体前移让肩肘充分伸展，再用上背和肩部推回。' }
      ],
      exercises: [
        { name: '绳索直臂下拉', group: '背部', icon: 'back', sets: 4, reps: '12–15 次', rest: 90, cue: '按计划完成，保持肩胛稳定，控制下拉和回放。' },
        { name: '凳背支撑坐姿单臂绳索划船（中立握）', group: '背部', icon: 'back', sets: 4, reps: '12 次/侧', rest: 90, unilateral: true, cue: '按计划完成，左右两侧都完成后确认这一组。' },
        { name: '引体向上', group: '背部', icon: 'back', sets: 4, reps: '按计划', rest: 90, cue: '按计划完成，保持肩胛下沉，控制下放。' },
        { name: '窄握坐姿绳索划船', group: '背部', icon: 'back', sets: 4, reps: '12–15 次', rest: 90, cue: '按计划完成，保持躯干稳定，控制拉回和回放。' },
        { name: '宽距中立握高位下拉', group: '背部', icon: 'back', sets: 4, reps: '15 次', rest: 90, cue: '按计划完成，保持肩胛稳定，控制下拉轨迹。' },
        { name: '杠铃弯举', group: '上臂', icon: 'arms', sets: 4, reps: '按计划', rest: 90, cue: '按计划完成，保持手肘稳定，避免身体借力。' }
      ]
    },
    {
      code: 'DAY 3',
      name: '臀腿',
      focus: '臀腿训练',
      totalSets: 17,
      duration: '',
      summary: '臀腿训练日。',
      warmups: [
        { name: '臀部滚动', dose: '每侧 30–60 秒 · 1 组', cue: '坐在泡沫轴上，一侧脚踝搭在对侧膝上，缓慢滚动臀部外侧。' },
        { name: '大腿内侧滚动', dose: '每侧 30–60 秒 · 1 组', cue: '俯卧或侧卧，将泡沫轴放在大腿内侧缓慢滚动，避开膝关节。' },
        { name: '弓步转体', dose: '每侧 3–5 次 · 1 组', cue: '进入弓步后保持骨盆稳定，胸椎向一侧旋转，再回正换边。' },
        { name: '弓步后移拉伸', dose: '每侧 10–20 秒 · 1 组', cue: '后膝落地，髋部缓慢向前，感受后侧髋屈肌拉伸，不要塌腰。' },
        { name: '青蛙趴前后移动', dose: '6–10 次完整往返 · 1 组', cue: '膝盖分开、脚尖朝外，骨盆小幅度前后移动，以髋内侧拉伸为主。' }
      ],
      exercises: [
        { name: '器械坐姿髋内收', group: '大腿', icon: 'legs', sets: 4, reps: '15 次', rest: 90, cue: '按计划完成，保持骨盆稳定，控制夹合与回放。' },
        { name: '哑铃单腿硬拉', group: '大腿', icon: 'legs', sets: 3, reps: '12 次/侧', rest: 90, unilateral: true, cue: '按计划完成，左右两侧都完成后确认这一组。' },
        { name: '哑铃交替后撤弓步', group: '大腿', icon: 'legs', sets: 4, reps: '按计划', rest: 90, cue: '按计划完成，保持前脚稳定，控制后撤与起身。' },
        { name: '单腿旋转弓步蹲', group: '大腿', icon: 'legs', sets: 3, reps: '10 次/侧', rest: 90, unilateral: true, cue: '按计划完成，左右两侧都完成后确认这一组。' },
        { name: '站姿提踵（踏板）', group: '小腿', icon: 'legs', sets: 3, reps: '15 次', rest: 90, cue: '按计划完成，脚跟充分下沉后踮起，控制回放。' }
      ]
    },
    {
      code: 'DAY 4',
      name: '肩 + 手臂',
      focus: '肩部与上臂',
      totalSets: 25,
      duration: '',
      summary: '肩 + 手臂训练日。',
      warmups: [
        { name: '中上背滚动', dose: '总计 30–60 秒 · 1 组', cue: '泡沫轴放在上背，双手抱头，胸廓打开，缓慢滚动。' },
        { name: '肱三头肌滚动', dose: '每侧 30–60 秒 · 1 组', cue: '上臂后侧放在泡沫轴上缓慢滚动，保持肩部放松。' },
        { name: '弹力带水平拉开', dose: '10–15 次 · 1 组', cue: '肩膀下沉，双手水平拉开，末端感受上背收紧。' },
        { name: '弹力带前后绕环', dose: '8–12 次 · 1 组', cue: '完整画圆，保持核心稳定，避免腰部跟着晃动。' },
        { name: '凳上跪姿肘屈伸', dose: '6–10 次 · 1 组', cue: '双手撑凳，身体前移让肩肘伸展，再通过肩胛骨和上背推回。' },
        { name: '俯卧 Y 字抬臂', dose: '8–12 次 · 1 组', cue: '俯卧，手臂形成 Y 字抬起，保持颈部中立和肩胛骨下沉。' }
      ],
      exercises: [
        { name: '器械反向飞鸟', group: '肩部', icon: 'shoulders', sets: 4, reps: '12–15 次', rest: 90, cue: '按计划完成，保持肩胛稳定，以肘部带动向两侧打开。' },
        { name: '站姿杠铃宽握推举', group: '肩部', icon: 'shoulders', sets: 5, reps: '8–10 次', rest: 90, cue: '按计划完成，收紧核心，避免腰部过度反弓。' },
        { name: '仰卧绳索面拉', group: '肩部', icon: 'shoulders', sets: 4, reps: '按计划', rest: 90, cue: '按计划完成，控制拉回轨迹，保持肩部稳定。' },
        { name: '哑铃前平举', group: '肩部', icon: 'shoulders', sets: 4, reps: '10–12 次', rest: 90, cue: '按计划完成，手肘微屈，避免耸肩和身体后仰。' },
        { name: '绳索过顶臂屈伸（绳把）', group: '上臂', icon: 'arms', sets: 4, reps: '10–12 次', rest: 90, cue: '按计划完成，保持上臂稳定，只屈伸前臂。' },
        { name: '地面坐姿绳索托臂弯举', group: '上臂', icon: 'arms', sets: 4, reps: '按计划', rest: 90, cue: '按计划完成，保持上臂稳定，控制弯举和回放。' }
      ]
    }
  );
  const TRAINING_PROGRAMS = {
    'home-four-split': { id: 'home-four-split', title: '居家四分化', days: TRAINING_PLANS },
    'four-split-training': { id: 'four-split-training', title: '四分化训练', days: FOUR_SPLIT_TRAINING_PLANS }
  };
  window.TRAINING_DATA = { icons: ICONS, plans: TRAINING_PLANS, programs: TRAINING_PROGRAMS, library: TRAINING_LIBRARY };
})();


