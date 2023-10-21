// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ChartPie from 'mdi-material-ui/ChartPie'
import Strategy from 'mdi-material-ui/Strategy'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'My Portfolio',
      icon: ChartPie,
      path: '/portfolio'
    },
    {
      title: 'Vault',
      icon: Strategy,
      path: '/vault'
    },
  ]
}

export default navigation
