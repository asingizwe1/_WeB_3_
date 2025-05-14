//+------------------------------------------------------------------+
//|                                                  hello_world.mq5 |
//|                                  Copyright 2025, MetaQuotes Ltd. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2025, MetaQuotes Ltd."
#property link      "https://www.mql5.com"
#property version   "1.00"
#property script_show_inputs
//--- input parameters
input int      Input1;
//+------------------------------------------------------------------+
//| Script program start function                                    |
//+------------------------------------------------------------------+
void OnStart()
  {
   double high = iHigh(_Symbol, PERIOD_CURRENT, 0); // _Symbol is the current chart symbol
   Alert("The high is " + DoubleToString(high, 5));
  }

//+------------------------------------------------------------------+
