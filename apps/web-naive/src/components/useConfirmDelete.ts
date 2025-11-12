// useConfirmDelete.ts
import { useDialog, useMessage } from 'naive-ui';

export function useConfirmDelete(action: (id: string) => Promise<any>) {
  const dialog = useDialog();
  const message = useMessage();

  return function confirmDelete(name: string, id: string) {
    dialog.warning({
      title: '确认删除',
      content: `确定要删除「${name}」吗？`,
      positiveText: '删除',
      negativeText: '取消',
      onPositiveClick: async () => {
        const hide = message.loading('正在删除...', {
          duration: 0,
        } as any);
        try {
          await action(id);
          hide.destroy();
          message.success('删除成功');
        } catch {
          hide.destroy();
          message.error('删除失败');
        }
      },
    });
  };
}
