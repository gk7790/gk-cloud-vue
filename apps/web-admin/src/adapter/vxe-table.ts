import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';
import type { Recordable } from '@vben/types';

import { h } from 'vue';

import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';
import { get } from '@vben/utils';

import { NButton, NImage, NTag } from 'naive-ui';

import { $t } from '#/locales';

import { useVbenForm } from './form';

setupVbenVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        columnConfig: {
          resizable: true,
        },
        minHeight: 180,
        formConfig: {
          // 全局禁用vxe-table的表单配置，使用formOptions
          enabled: false,
        },
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'items',
            total: 'total',
            list: 'items',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'small',
      } as VxeTableGridOptions,
    });

    // 表格配置项可以用 cellRender: { name: 'CellImage' },
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params;
        return h(NImage, { src: row[column.field] });
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts;
        return h(
          NButton,
          { size: 'small', type: 'primary', quaternary: true },
          { default: () => props?.text },
        );
      },
    });

    vxeUI.renderer.add('CellTag', {
      renderTableDefault({ options, props }, { column, row }) {
        const value = get(row, column.field);
        const tagOptions = options ?? [
          { type: 'success', label: $t('common.enabled'), value: 1 },
          { type: 'warning', label: $t('common.suspend'), value: 2 },
          { type: 'error', label: $t('common.disabled'), value: 3 },
        ];
        const tagItem = tagOptions.find((item) => item.value === value);

        return h(
          NTag,
          {
            ...props,
            type: tagItem?.type,
            size: 'small',
            round: false,
            bordered: false,
            style: { borderRadius: '6px', ...props?.style },
          },
          { default: () => tagItem?.label ?? value },
        );
      },
    });
    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useVbenForm,
});

export { useVbenVxeGrid };

export type OnActionClickParams<T = Recordable<any>> = {
  code: string;
  row: T;
};

export type OnActionClickFn<T = Recordable<any>> = (
  params: OnActionClickParams<T>,
) => void;

export type * from '@vben/plugins/vxe-table';
