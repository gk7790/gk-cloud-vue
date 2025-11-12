import { h, nextTick, ref } from 'vue';

import { NButton, NDrawer, NDrawerContent } from 'naive-ui';

interface DrawerOptions<T = any> {
  title?: string;
  width?: number | string;
  resizable?: boolean;
  maskClosable?: boolean;
  data?: T;
  onConfirm?: (data: T) => void;
  onCancel?: () => void;
  content?: (data: T) => any; // 插槽内容
}

export function useDrawer<T = any>() {
  const visible = ref(false);
  const data = ref<null | T>(null);

  let container: HTMLElement | null = null;

  const open = (options: DrawerOptions<T> = {}) => {
    data.value = options.data ?? null;
    visible.value = true;

    nextTick(() => {
      if (!container) {
        container = document.createElement('div');
        document.body.append(container);
      }

      const vnode = h(
        NDrawer,
        {
          show: visible.value,
          'onUpdate:show': (val: boolean) => {
            visible.value = val;
            if (!val) close();
          },
          placement: 'right',
          defaultWidth: options.width ?? 600,
          resizable: options.resizable ?? true,
          maskClosable: options.maskClosable ?? true,
        },
        {
          default: () => [
            h(
              NDrawerContent,
              {
                title: options.title ?? '抽屉',
                closable: true,
                onClose: close,
              },
              {
                default: () => [
                  options.content ? options.content(data.value!) : null,
                  h('div', { style: 'margin-top:16px; text-align:right;' }, [
                    h(NButton, { onClick: handleCancel }, '取消'),
                    h(
                      NButton,
                      {
                        type: 'primary',
                        style: 'margin-left:8px;',
                        onClick: handleConfirm,
                      },
                      '确认',
                    ),
                  ]),
                ],
              },
            ),
          ],
        },
      );

      // 挂载
      const app = createApp({ render: () => vnode });
      app.mount(container);
    });
  };

  const close = () => {
    visible.value = false;
    if (container) {
      container.remove();
      container = null;
    }
  };

  const handleConfirm = () => {
    options?.onConfirm?.(data.value!);
    close();
  };

  const handleCancel = () => {
    options?.onCancel?.();
    close();
  };

  return { open, close, visible, data };
}
